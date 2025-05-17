import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import {
    Typography,
    Card,
    CardBody,
    Button,
    Chip,
    Progress, // Material Tailwind의 Progress 컴포넌트 사용 (피버 게이지용)
} from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import {ChatbotUI, Footer} from "@/widgets/layout/index.js";

const WEBSOCKET_URL = 'ws://ahnai1.suwon.ac.kr:5041/ws-click';
const SEND_DESTINATION = '/app/click';
const RECEIVE_DESTINATION = '/topic/clicks';

const TEAMS_CONFIG = [
    { key: "ict", name: "정보통신학부", shortName: "정", dbClickId: 1, color: "blue", borderColor: "border-blue-500", textColor: "text-blue-700", bgColor: "bg-blue-100", feverColor: "bg-blue-600" },
    { key: "data", name: "데이터과학부", shortName: "데", dbClickId: 2, color: "green", borderColor: "border-green-500", textColor: "text-green-700", bgColor: "bg-green-100", feverColor: "bg-green-600" },
    { key: "computer", name: "컴퓨터학부", shortName: "컴", dbClickId: 3, color: "orange", borderColor: "border-orange-500", textColor: "text-orange-700", bgColor: "bg-orange-100", feverColor: "bg-orange-600" },
];

const CLICK_ID_TO_TEAM_KEY_MAP = TEAMS_CONFIG.reduce((acc, team) => {
    acc[team.dbClickId] = team.key;
    return acc;
}, {});

const FEVER_GAUGE_MAX = 300;
const FEVER_POINTS_PER_CLICK = 1;
const FEVER_MODE_DURATION = 10000;
const FEVER_CLICK_MULTIPLIER = 2;

// 피버 게이지 자동 감소 관련 상수
const FEVER_DECAY_INTERVAL = 500; // 게이지 감소 간격 (ms) - 예: 1.5초마다
const FEVER_DECAY_AMOUNT = 1;    // 감소량 - 예: 1 포인트씩

// 히트 효과 컴포넌트 (기존과 동일)
const HitEffect = ({ hit, position }) => {
    if (!hit) return null;
    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9990]">
            <motion.div initial={{ opacity: 0, scale: 0, x: position.x, y: position.y }} animate={{ opacity: [0, 1, 0.8, 0], scale: [0, 1.2, 1.3, 1.5], }} transition={{ duration: 0.5, ease: "easeOut" }} className="absolute -translate-x-1/2 -translate-y-1/2">
                <div className="w-40 h-40 rounded-full bg-white opacity-70 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-yellow-100 opacity-80 animate-ping-slow"></div>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: position.x, y: position.y, rotate: Math.random() * 20 - 10 }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3], y: position.y - 20 }} transition={{ duration: 0.5 }} className="absolute -translate-x-1/2 -translate-y-1/2 font-black text-3xl text-red-600" style={{ textShadow: '0 0 5px white, 0 0 10px white' }}>
                딸깍!
            </motion.div>
        </div>
    );
};

function TeamScoreCard({ team, score, rank, onClick, feverGaugeValue, isFeverActive, feverGaugeMax }) {
    const [floatingTexts, setFloatingTexts] = useState([]);
    const [hitActive, setHitActive] = useState(false);
    const [hitPosition, setHitPosition] = useState({ x: 0, y: 0 });
    const audioRef = useRef(null);
    const hitSoundRef = useRef(null);
    const buttonRef = useRef(null);
    const [isWobbling, setIsWobbling] = useState(false);

    useEffect(() => {
        audioRef.current = new Audio('/img/click.mp3');
        hitSoundRef.current = new Audio('/img/click.mp3');
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                setIsWobbling(true);
                setTimeout(() => setIsWobbling(false), 500);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleClick = (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.error("오디오 재생 오류:", err));
        }
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            setHitPosition({ x: centerX, y: centerY });
            setHitActive(true);
            setTimeout(() => setHitActive(false), 500);
            if (hitSoundRef.current) {
                hitSoundRef.current.volume = 0.8;
                hitSoundRef.current.play().catch(err => console.error("히트 오디오 재생 오류:", err));
            }
        }
        const id = uuidv4();
        const randomLeft = Math.random() * 80 + 10;
        setFloatingTexts(prev => [...prev, { id, left: randomLeft }]);
        setTimeout(() => {
            setFloatingTexts(prev => prev.filter(text => text.id !== id));
        }, 1000);
        setIsWobbling(true);
        setTimeout(() => setIsWobbling(false), 500);
        onClick(); // 부모의 handleTeamClick 호출 (teamKey 포함)
    };

    const getRankStyles = () => {
        // ... (기존 순위 스타일 로직)
        if (rank === 1) return { scale: 1.1, zIndex: 10, border: `5px solid #FFD700`, shadow: "shadow-xl", badge: "bg-yellow-500", rotation: "rotate-2" };
        if (rank === 2) return { scale: 0.95, zIndex: 5, border: `3px solid #C0C0C0`, shadow: "shadow-lg", badge: "bg-gray-400", rotation: "rotate-[-1deg]" };
        if (rank === 3) return { scale: 0.95, zIndex: 5, border: `3px solid #CD7F32`, shadow: "shadow-lg", badge: "bg-amber-700", rotation: "rotate-1" };
        return { scale: 0.9, zIndex: 1, border: `2px solid ${team.borderColor.replace('border-', '')}`, shadow: "shadow-md", badge: "bg-gray-500", rotation: "" };
    };
    const rankStyles = getRankStyles();

    const getRankExclamation = () => {
        if (rank === 1) return "와 대박!";
        if (rank === 2) return "거의 1등!";
        if (rank === 3) return "분발하세요!";
        return "화이팅!";
    };

    const feverProgress = feverGaugeMax > 0 ? ((feverGaugeValue || 0) / feverGaugeMax) * 100 : 0;

    return (
        <>
            <HitEffect hit={hitActive} position={hitPosition} />
            <motion.div
                animate={isWobbling ? { rotate: [0, -2, 3, -3, 2, 0], scale: [1, 1.03, 0.97, 1.02, 0.98, 1] } : {}}
                transition={{ duration: 0.5 }}
                className="relative" // This is the stacking context parent
            >
                {isFeverActive && ( // 피버 모드 시 카드 외곽선 애니메이션 효과
                    <div className="absolute inset-[-5px] rounded-xl border-4 border-red-500 animate-pulse z-[1]" /> // Glow effect with z-index 1
                )}
                <Card
                    className={`relative overflow-hidden ${rankStyles.border ? '' : team.borderColor} ${rankStyles.shadow} transition-all duration-500 ${rankStyles.rotation} ${isFeverActive ? 'shadow-red-500/50' : ''} z-[2]`} // Card with z-index 2 (or higher)
                    style={{
                        borderColor: isFeverActive ? 'rgb(239 68 68)' : (rankStyles.border.includes('#') ? rankStyles.border.split(' ')[2] : undefined),
                        borderWidth: isFeverActive ? '4px' : (rankStyles.border.includes('#') ? rankStyles.border.split(' ')[0] : undefined),
                        background: rank === 1 ? 'linear-gradient(135deg, #fffcef, #fff, #fffefa)' :
                            rank === 2 ? 'linear-gradient(135deg, #f8f8f8, #fff, #f8f8f8)' :
                                rank === 3 ? 'linear-gradient(135deg, #f9f3ea, #fff, #f9f3ea)' : '#fff'
                    }}
                >
                    {/* ... (기존 장식 요소들) ... */}
                    {rank === 1 && (
                        <>
                            <div className="absolute top-2 left-2 w-6 h-6 bg-yellow-300 rounded-full animate-ping opacity-70 z-[-1]"></div>
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-yellow-300 rounded-full animate-ping opacity-70 z-[-1]"></div>
                            <div className="absolute top-2 right-10 text-2xl animate-bounce">✨</div>
                            <div className="absolute bottom-10 left-4 text-2xl transform rotate-12 animate-pulse">🔥</div>
                        </>
                    )}
                    {rank === 2 && (<div className="absolute top-2 right-4 text-xl transform rotate-[-10deg] animate-pulse">👍</div>)}
                    {rank === 3 && (<div className="absolute top-3 right-2 text-xl transform rotate-12 animate-bounce">💦</div>)}
                    {rank === 1 && (
                        <div className="absolute top-0 left-0 w-full flex justify-center z-20 -mt-8 transform-gpu">
                            <motion.img src="/img/crown.png" alt="1등 왕관" className="w-24 h-24" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1, rotate: [0, -5, 5, 0] }} transition={{ y: { duration: 0.5, type: "spring", bounce: 0.4 }, rotate: { duration: 2, repeat: Infinity, repeatType: "mirror" }}} />
                        </div>
                    )}
                    <Chip value={`${rank}위 ${getRankExclamation()}`} className={`absolute -top-2 ${rank === 1 ? 'right-4' : rank === 2 ? 'left-4' : 'right-4'} font-bold ${rankStyles.badge} text-white z-10 ${rank === 1 ? 'animate-pulse' : ''}`} />

                    {/* CardBody 내부 z-index는 Card의 z-index에 상대적이므로 CardBody 자체의 z-10은 유지해도 괜찮습니다. */}
                    <CardBody className={`flex flex-col items-center p-6 relative ${rank === 1 ? 'pt-8' : ''} z-10`}>
                        {/* ... (Typography, Score, Progress Bar, Button, etc.) ... */}
                        <Typography variant="h5" className={`${team.textColor} font-bold mb-2`}>
                            {team.name}
                        </Typography>
                        <div className="relative my-4">
                            <Typography variant="h1" className={`${team.textColor} text-7xl font-black ${rank === 1 || isFeverActive ? 'animate-pulse' : ''}`} style={{ textShadow: rank === 1 ? '0 0 10px rgba(255, 215, 0, 0.5)' : (isFeverActive ? '0 0 15px rgba(255,0,0,0.7)' : 'none'), WebkitTextStroke: rank === 1 ? '1px #FFD700' : (isFeverActive ? '1px #FF0000' : 'none') }}>
                                {score.toLocaleString()}
                            </Typography>
                            <AnimatePresence>
                                {floatingTexts.map(({ id, left }) => (
                                    <motion.div key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -30 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute text-black-500 font-bold text-[25px] pointer-events-none whitespace-nowrap" style={{ top: "30%", left: `${left}%` }}>
                                        딸깍! {isFeverActive && "🔥"}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="w-full my-2">
                            <div className="flex justify-between mb-1">
                                <Typography variant="small" color={isFeverActive ? "red" : "blue-gray"} className="font-medium">
                                    {isFeverActive ? "FEVER TIME!" : "피버 게이지"}
                                </Typography>
                                <Typography variant="small" color={isFeverActive ? "red" : "blue-gray"} className="font-medium">
                                    {Math.floor(feverProgress)}%
                                </Typography>
                            </div>
                            <Progress value={feverProgress} color={isFeverActive ? "red" : team.color} size="md" className={`transition-all duration-300 ${isFeverActive ? 'animate-pulse' : ''}`} />
                        </div>

                        <motion.div whileTap={{ scale: 0.95 }} className="w-full">
                            <Button ref={buttonRef} color={isFeverActive ? "red" : team.color} size="lg" onClick={handleClick} onTouchStart={(e) => { e.preventDefault(); }} className={`w-full py-3 text-base font-bold transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden ${rank === 1 && !isFeverActive ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 border-2 border-yellow-700' : ''} ${isFeverActive ? 'animate-bounce_slight' : ''}`}>
                                {isFeverActive ? `FEVER CLICK! (x${FEVER_CLICK_MULTIPLIER})` : "클릭!"}
                                {rank === 1 && !isFeverActive && <span className="absolute right-2 top-1 text-sm animate-bounce">👈👈👈</span>}
                                {isFeverActive && <span className="absolute right-2 top-1 text-lg animate-bounce">🔥🔥🔥</span>}
                            </Button>
                        </motion.div>
                        <Typography className={`text-xs mt-2 italic ${isFeverActive ? "text-red-500 font-bold" : (rank === 1 ? 'text-yellow-600' : rank === 2 ? 'text-gray-600' : 'text-amber-700')}`}>
                            {isFeverActive ? "지금이야! 미친듯이 클릭!!" : (rank === 1 ? "클릭하면 우승 확정!" : rank === 2 ? "조금만 더 클릭하세요!" : "많이 클릭해주세요!")}
                        </Typography>
                    </CardBody>
                </Card>
            </motion.div>
        </>
    );
}

export function ClickBattle() {
    const initialScoresState = TEAMS_CONFIG.reduce((acc, team) => ({ ...acc, [team.key]: 0 }), {});
    const [scores, setScores] = useState(initialScoresState);
    const [isConnected, setIsConnected] = useState(false);
    const clientRef = useRef(null);
    const [prevRanks, setPrevRanks] = useState({});
    const rankChangeAudioRef = useRef(null);

    const initialFeverState = TEAMS_CONFIG.reduce((acc, team) => ({ ...acc, [team.key]: 0 }), {});
    const [feverGauges, setFeverGauges] = useState(initialFeverState);

    const initialFeverActiveState = TEAMS_CONFIG.reduce((acc, team) => ({ ...acc, [team.key]: false }), {});
    const [feverActive, setFeverActive] = useState(initialFeverActiveState);

    const feverTimersRef = useRef({});

    useEffect(() => {
        rankChangeAudioRef.current = new Audio('/img/click.mp3');
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const targetTagName = event.target.tagName;
            if (targetTagName === 'INPUT' || targetTagName === 'TEXTAREA' || event.target.isContentEditable) return;
            if (event.key === ' ' || event.key === 'Enter') event.preventDefault();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // 피버 게이지 자동 감소 로직
    useEffect(() => {
        const decayIntervalId = setInterval(() => {
            // setFeverGauges를 함수형 업데이트로 호출하여 최신 feverActive 상태를 간접적으로 참조합니다.
            // 또는 feverActive를 이 useEffect의 의존성 배열에 추가하여, feverActive가 변경될 때마다
            // 인터벌을 재설정하도록 합니다. 여기서는 후자의 방식을 사용합니다.
            setFeverGauges(prevGauges => {
                let newGauges = { ...prevGauges };
                let changed = false;
                TEAMS_CONFIG.forEach(team => {
                    // 현재 팀이 피버 모드가 아니고, 게이지가 0보다 클 때만 감소
                    if (!feverActive[team.key] && newGauges[team.key] > 0) {
                        newGauges[team.key] = Math.max(0, newGauges[team.key] - FEVER_DECAY_AMOUNT);
                        changed = true;
                    }
                });
                // 변경이 있을 때만 상태 업데이트를 트리거하여 불필요한 리렌더링 방지
                return changed ? newGauges : prevGauges;
            });
        }, FEVER_DECAY_INTERVAL);

        return () => {
            clearInterval(decayIntervalId); // 컴포넌트 언마운트 시 인터벌 정리
        };
    }, [feverActive]); // feverActive 상태가 변경될 때마다 effect를 재실행하여 인터벌을 최신 상태로 유지

    // ... (getSortedTeams, getTeamRanks, 기타 useEffect들)
    const getSortedTeams = () => TEAMS_CONFIG.map(team => ({ ...team, score: scores[team.key] || 0 })).sort((a, b) => b.score - a.score);
    const getTeamRanks = () => {
        const sorted = getSortedTeams();
        return sorted.reduce((acc, team, index) => ({ ...acc, [team.key]: index + 1 }), {});
    };

    const teamRanks = getTeamRanks();
    const sortedTeams = getSortedTeams();

    useEffect(() => {
        if (Object.keys(prevRanks).length > 0) {
            const hasRankChanged = Object.keys(teamRanks).some(key => prevRanks[key] !== teamRanks[key]);
            if (hasRankChanged && rankChangeAudioRef.current) {
                rankChangeAudioRef.current.play().catch(e => console.error("순위 변동 오디오 재생 오류:", e));
                console.log("순위 변동 발생!");
            }
        }
        setPrevRanks(teamRanks);
    }, [teamRanks, prevRanks]);

    useEffect(() => {
        const fetchInitialScores = async () => {
            try {
                const response = await fetch('http://ahnai1.suwon.ac.kr:5041/click-num');
                const initialDataArray = await response.json();
                setScores(prevScores => {
                    const updatedScores = { ...initialScoresState };
                    initialDataArray.forEach(item => {
                        const teamKey = CLICK_ID_TO_TEAM_KEY_MAP[item.clinkId];
                        if (teamKey) updatedScores[teamKey] = item.clickNum;
                    });
                    return updatedScores;
                });
            } catch (error) { console.error("초기 점수를 가져오는 데 실패했습니다:", error); }
        };
        fetchInitialScores();

        const client = new Client({ brokerURL: WEBSOCKET_URL, reconnectDelay: 5000, heartbeatIncoming: 4000, heartbeatOutgoing: 4000 });
        client.onConnect = () => {
            setIsConnected(true);
            client.subscribe(RECEIVE_DESTINATION, (message) => {
                if (message.body) {
                    try {
                        const updatedClickData = JSON.parse(message.body);
                        const teamKey = CLICK_ID_TO_TEAM_KEY_MAP[updatedClickData.clickId];
                        if (teamKey) {
                            setScores(prev => ({ ...prev, [teamKey]: updatedClickData.clickNum }));
                        }
                    } catch (e) { console.error("WebSocket 메시지 파싱 중 오류:", e); }
                }
            });
        };
        client.onDisconnect = () => setIsConnected(false);
        client.onStompError = () => setIsConnected(false);
        client.onWebSocketError = () => setIsConnected(false);
        client.onWebSocketClose = () => setIsConnected(false);
        client.activate();
        clientRef.current = client;

        return () => { // Cleanup
            if (clientRef.current?.connected) clientRef.current.deactivate();
            setIsConnected(false);
            Object.values(feverTimersRef.current).forEach(clearTimeout);
        };
    }, []);


    const handleTeamClick = (teamDbClickId, teamKey) => {
        if (!clientRef.current?.connected || !isConnected) {
            alert("서버에 연결되지 않았습니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        // 현재 feverActive 상태를 직접 참조하여 사용
        const isCurrentlyInFeverMode = feverActive[teamKey];
        let clickToSend = 1;
        let newGaugeValueForThisClick = feverGauges[teamKey] || 0;


        if (isCurrentlyInFeverMode) {
            clickToSend = FEVER_CLICK_MULTIPLIER;
            // 피버 중에는 게이지를 직접 변경하지 않음 (타이머에 의해 종료 시 0으로 리셋됨)
            // 또는, 피버 중 클릭 시 게이지 유지 또는 약간 회복 등의 로직 추가 가능 (현재는 유지)
        } else {
            newGaugeValueForThisClick += FEVER_POINTS_PER_CLICK;
            if (newGaugeValueForThisClick >= FEVER_GAUGE_MAX) {
                newGaugeValueForThisClick = FEVER_GAUGE_MAX;
                clickToSend = FEVER_CLICK_MULTIPLIER;

                setFeverActive(prev => ({ ...prev, [teamKey]: true }));
                console.log(`${teamKey}팀 피버 모드 발동!`);

                if (feverTimersRef.current[teamKey]) {
                    clearTimeout(feverTimersRef.current[teamKey]);
                }
                feverTimersRef.current[teamKey] = setTimeout(() => {
                    setFeverActive(prev => ({ ...prev, [teamKey]: false }));
                    setFeverGauges(prev => ({ ...prev, [teamKey]: 0 })); // 피버 종료 시 게이지 완전 초기화
                    console.log(`${teamKey}팀 피버 모드 종료.`);
                }, FEVER_MODE_DURATION);
            }
            // 클릭으로 인한 게이지 변경사항 즉시 반영
            setFeverGauges(prev => ({ ...prev, [teamKey]: newGaugeValueForThisClick }));
        }


        for (let i = 0; i < clickToSend; i++) {
            const clickMessageToServer = { clickId: teamDbClickId };
            try {
                clientRef.current.publish({
                    destination: SEND_DESTINATION,
                    body: JSON.stringify(clickMessageToServer),
                });
            } catch (e) {
                console.error("클릭 메시지 발행 중 오류:", e);
                break;
            }
        }
    };
    // ... (getGridPositions, return JSX)
    const getGridPositions = () => ({
        1: "md:col-start-2 md:col-span-1 md:row-start-1",
        2: "md:col-start-1 md:col-span-1 md:row-start-1",
        3: "md:col-start-3 md:col-span-1 md:row-start-1"
    });
    const gridPositions = getGridPositions();

    return (
        <>
            {/* Header and background */}
            <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 opacity-90 transition-all duration-500">
                    <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className="absolute rounded-full bg-white" style={{ width: Math.random() * 10 + 5 + 'px', height: Math.random() * 10 + 5 + 'px', top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', opacity: Math.random() * 0.5 + 0.2, animation: `float ${Math.random() * 10 + 10}s linear infinite`, animationDelay: `${Math.random() * 5}s` }} />
                        ))}
                    </div>
                </div>
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 15 }).map((_, index) => (
                        <motion.div key={`icon-${index}`} initial={{ y: -20, x: Math.random() * 100 + '%', opacity: 0 }} animate={{ y: ['0%', '100%'], opacity: [0, 1, 1, 0], }} transition={{ duration: Math.random() * 5 + 8, repeat: Infinity, delay: Math.random() * 8, ease: "linear" }} className="absolute">
                            <img src="/img/favicon.png" alt="딸깍 아이콘" className="w-6 h-6 md:w-8 md:h-8" style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))', transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.8})` }} />
                        </motion.div>
                    ))}
                </div>
                <div className="relative h-full flex flex-col items-center justify-center px-4 text-center z-10">
                    <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, type: "spring" }}>
                        <Typography variant="h1" color="white" className="font-black text-4xl md:text-6xl lg:text-7xl mb-2 tracking-tight" style={{ textShadow: '0 0 15px rgba(255,255,255,0.3), 0 0 30px rgba(131, 56, 236, 0.5)', }}>
                            <span className="animate-pulse inline-block transform hover:scale-110 transition-transform mr-2">딸</span>
                            <span className="animate-pulse inline-block transform hover:scale-110 transition-transform" style={{animationDelay: '0.2s'}}>깍</span>
                            <span className="inline-block mx-3 text-pink-300">!</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300"> 배틀 챌린지</span>
                        </Typography>
                    </motion.div>
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
                        <div className="max-w-2xl mx-auto mt-4">
                            <Typography variant="lead" color="white" className="opacity-90 text-lg md:text-xl" style={{ textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                                여러분의 학부를 응원하세요! 누가 가장 많은 클릭을 받을지 대결을 시작합니다!
                            </Typography>
                        </div>
                    </motion.div>
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6, type: "spring", bounce: 0.5 }} className="mt-8">
                        <div className="flex flex-col md:flex-row gap-3 items-center">
                            <div className="bg-white bg-opacity-10 backdrop-blur-md p-3 px-5 rounded-full flex items-center space-x-2 shadow-xl border border-white border-opacity-20">
                                <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`} />
                                <Typography className="text-white font-medium">{isConnected ? "서버 연결됨" : "연결 중..."}</Typography>
                            </div>
                            <div className="p-2 px-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                                <Typography className="text-white font-bold flex items-center"><span className="mr-1">👆</span> 클릭하고 승리하세요!</Typography>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes float { 0% { transform: translateY(0) scale(1); } 50% { transform: translateY(-100px) scale(1.2); } 100% { transform: translateY(-200px) scale(0.8); opacity: 0; }}
                @keyframes wiggle { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); }}
                .animate-wiggle { animation: wiggle 0.5s ease-in-out infinite; }
                @keyframes ping-slow { 0% { transform: scale(0.8); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.6; } 100% { transform: scale(0.8); opacity: 1; }}
                .animate-ping-slow { animation: ping-slow 1.8s cubic-bezier(0, 0, 0.2, 1) infinite; }
                .animate-bounce_slight { animation: bounce_slight 1s infinite; }
                @keyframes bounce_slight { 0%, 100% { transform: translateY(-3%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); } }
            `}</style>

            {/* Game Section */}
            <section className="-mt-20 px-4 pb-16 pt-8 md:pt-12 bg-gradient-to-b from-transparent to-gray-100">
                <div className="container mx-auto max-w-screen-xl">
                    {isConnected || Object.values(scores).some(s => s > 0) ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-1 md:gap-4 relative">
                            {sortedTeams.map((team, index) => (
                                <motion.div key={team.key} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, scale: index === 0 ? 1.05 : index === 1 ? 0.95 : index === 2 ? 0.95 : 0.9 }} transition={{ duration: 0.5, layout: { duration: 0.5, type: "spring" } }} className={`${gridPositions[index + 1] || ""} ${index === 0 ? 'mt-10' : ''}`}>
                                    <TeamScoreCard
                                        team={team}
                                        score={scores[team.key]}
                                        rank={index + 1}
                                        onClick={() => handleTeamClick(team.dbClickId, team.key)}
                                        feverGaugeValue={feverGauges[team.key]}
                                        isFeverActive={feverActive[team.key]}
                                        feverGaugeMax={FEVER_GAUGE_MAX}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg p-10 text-center">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                <Typography variant="h4" color="blue-gray">{clientRef.current && clientRef.current.active ? "초기 데이터를 불러오고 있습니다..." : "서버에 연결 중입니다..."}</Typography>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <div className="bg-white">
                <Footer />
            </div>
            <ChatbotUI />
        </>
    );
}