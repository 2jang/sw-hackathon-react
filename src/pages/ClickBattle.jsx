import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import {
    Typography,
    Card,
    CardBody,
    Button,
    Chip,
    Progress,
} from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import {ChatbotUI, Footer} from "@/widgets/layout/index.js";

const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const WEBSOCKET_URL = `${protocol}//${window.location.host}/ws-click`;
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

const FEVER_DECAY_INTERVAL = 500;
const FEVER_DECAY_AMOUNT = 1;
const IDLE_THRESHOLD_FOR_DECAY = 1500; // 1.5초 동안 입력 없으면 게이지 감소 시작

const MACRO_CLICK_LIMIT = 10; // 초당 클릭 제한
const MACRO_WINDOW_MS = 1000; // 1초

function TeamScoreCard({ team, score, rank, onClick, feverGaugeValue, isFeverActive, feverGaugeMax }) {
    const [floatingTexts, setFloatingTexts] = useState([]);
    const audioRef = useRef(null);
    const buttonRef = useRef(null);
    const [isWobbling, setIsWobbling] = useState(false);

    useEffect(() => {
        audioRef.current = new Audio('/img/click.mp3');
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

        const id = uuidv4();
        const randomLeft = Math.random() * 80 + 10;
        setFloatingTexts(prev => [...prev, { id, left: randomLeft }]);
        setTimeout(() => {
            setFloatingTexts(prev => prev.filter(text => text.id !== id));
        }, 1000);
        setIsWobbling(true);
        setTimeout(() => setIsWobbling(false), 500);
        onClick(); // 부모의 handleTeamClick 호출
    };

    const getRankStyles = () => {
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
            <motion.div
                animate={isWobbling ? { rotate: [0, -2, 3, -3, 2, 0], scale: [1, 1.03, 0.97, 1.02, 0.98, 1] } : {}}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                {isFeverActive && (
                    <div className="absolute inset-[-5px] rounded-xl border-4 border-red-500 animate-pulse z-[1]" />
                )}
                <Card
                    className={`relative overflow-hidden ${rankStyles.border ? '' : team.borderColor} ${rankStyles.shadow} transition-all duration-500 ${rankStyles.rotation} ${isFeverActive ? 'shadow-red-500/50' : ''} z-[2]`}
                    style={{
                        borderColor: isFeverActive ? 'rgb(239 68 68)' : (rankStyles.border.includes('#') ? rankStyles.border.split(' ')[2] : undefined),
                        borderWidth: isFeverActive ? '4px' : (rankStyles.border.includes('#') ? rankStyles.border.split(' ')[0] : undefined),
                        background: rank === 1 ? 'linear-gradient(135deg, #fffcef, #fff, #fffefa)' :
                            rank === 2 ? 'linear-gradient(135deg, #f8f8f8, #fff, #f8f8f8)' :
                                rank === 3 ? 'linear-gradient(135deg, #f9f3ea, #fff, #f9f3ea)' : '#fff'
                    }}
                >
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
                    <CardBody className={`flex flex-col items-center p-6 relative ${rank === 1 ? 'pt-8' : ''} z-10`}>
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

    // 피버 게이지 조건부 감소용: 각 팀 마지막 클릭 시간 저장
    const lastClickTimestampsRef = useRef(TEAMS_CONFIG.reduce((acc, team) => ({ ...acc, [team.key]: 0 }), {}));

    // 매크로 방지용: 팀별 클릭 기록 저장
    const teamClickHistoryRef = useRef(TEAMS_CONFIG.reduce((acc, team) => ({ ...acc, [team.key]: [] }), {}));


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

    // 피버 게이지 자동 감소 로직 (조건부)
    useEffect(() => {
        const decayIntervalId = setInterval(() => {
            const now = Date.now();
            setFeverGauges(prevGauges => {
                let newGauges = { ...prevGauges };
                let changed = false;
                TEAMS_CONFIG.forEach(team => {
                    // 피버 모드가 아니고, 게이지가 0보다 크고, 마지막 클릭 후 일정 시간이 지났을 때만 감소
                    if (!feverActive[team.key] &&
                        newGauges[team.key] > 0 &&
                        (now - (lastClickTimestampsRef.current[team.key] || 0)) > IDLE_THRESHOLD_FOR_DECAY
                    ) {
                        newGauges[team.key] = Math.max(0, newGauges[team.key] - FEVER_DECAY_AMOUNT);
                        changed = true;
                    }
                });
                return changed ? newGauges : prevGauges;
            });
        }, FEVER_DECAY_INTERVAL);

        return () => {
            clearInterval(decayIntervalId);
        };
    }, [feverActive]); // feverActive 상태 변경 시 인터벌 재설정 (lastClickTimestampsRef는 ref라 의존성 불필요)

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
        // ✨ 수정: API Base URL을 동적으로 설정
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const apiBaseUrl = isLocalhost ? 'http://localhost:5041' : ''; // 로컬이면 5041 포트, 배포면 상대 경로('')

        const fetchInitialScores = async () => {
            try {
                // ✨ 수정: apiBaseUrl 변수 사용
                const response = await fetch(`${apiBaseUrl}/click-num`);
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

        return () => {
            if (clientRef.current?.connected) clientRef.current.deactivate();
            setIsConnected(false);
            Object.values(feverTimersRef.current).forEach(clearTimeout);
        };
    }, []);


    const handleTeamClick = (teamDbClickId, teamKey) => {
        const now = Date.now();

        // 매크로 감지 로직
        const clickHistory = teamClickHistoryRef.current[teamKey] || [];
        // MACRO_WINDOW_MS (1초) 이내의 클릭만 필터링
        const recentClicks = clickHistory.filter(ts => (now - ts) < MACRO_WINDOW_MS);

        if (recentClicks.length >= MACRO_CLICK_LIMIT) {
            alert("매크로를 사용하면 안됩니다!");
            // 현재 클릭은 무시하고, 클릭 기록은 최신 상태로 유지 (오래된 기록 제거)
            teamClickHistoryRef.current[teamKey] = recentClicks;
            return;
        }
        // 매크로가 아니면 현재 클릭 시간을 기록에 추가
        teamClickHistoryRef.current[teamKey] = [...recentClicks, now];

        // 마지막 클릭 시간 업데이트 (피버 게이지 감소 로직용)
        lastClickTimestampsRef.current[teamKey] = now;


        if (!clientRef.current?.connected || !isConnected) {
            alert("서버에 연결되지 않았습니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        const isCurrentlyInFeverMode = feverActive[teamKey];
        let clickToSend = 1;
        let newGaugeValueForThisClick = feverGauges[teamKey] || 0;


        if (isCurrentlyInFeverMode) {
            clickToSend = FEVER_CLICK_MULTIPLIER;
        } else {
            newGaugeValueForThisClick += FEVER_POINTS_PER_CLICK;
            if (newGaugeValueForThisClick >= FEVER_GAUGE_MAX) {
                newGaugeValueForThisClick = FEVER_GAUGE_MAX; // 게이지 최대치 초과 방지
                clickToSend = FEVER_CLICK_MULTIPLIER;

                setFeverActive(prev => ({ ...prev, [teamKey]: true }));
                console.log(`${teamKey}팀 피버 모드 발동!`);

                if (feverTimersRef.current[teamKey]) {
                    clearTimeout(feverTimersRef.current[teamKey]);
                }
                feverTimersRef.current[teamKey] = setTimeout(() => {
                    setFeverActive(prev => ({ ...prev, [teamKey]: false }));
                    setFeverGauges(prev => ({ ...prev, [teamKey]: 0 }));
                    console.log(`${teamKey}팀 피버 모드 종료.`);
                }, FEVER_MODE_DURATION);
            }
            // 클릭으로 인한 게이지 변경사항 즉시 반영
            setFeverGauges(prev => ({ ...prev, [teamKey]: Math.min(newGaugeValueForThisClick, FEVER_GAUGE_MAX) }));
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

    const getGridPositions = () => ({
        1: "md:col-start-2 md:col-span-1 md:row-start-1",
        2: "md:col-start-1 md:col-span-1 md:row-start-1",
        3: "md:col-start-3 md:col-span-1 md:row-start-1"
    });
    const gridPositions = getGridPositions();

    return (
        <>
            {/* Header and background */}
            <div className="relative h-[50vh] md:h-[40vh] overflow-hidden"> {/* 사용자 코드의 헤더 높이 유지 */}
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
                                {`${sortedTeams.map(team => team.shortName).join('')} 학과의 대결! 과연 승자는?`}
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
                                {/* 사용자 코드의 문구 유지 */}
                                <Typography className="text-white font-bold flex items-center"><span className="mr-1">👆</span> 상대보다 더 많이 클릭하자!</Typography>
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

            <section className="-mt-20 px-4 pb-16 pt-8 md:pt-12 bg-gradient-to-b from-transparent to-gray-100">
                <div className="container mx-auto max-w-screen-xl">
                    {isConnected || Object.values(scores).some(s => s > 0) ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-1 md:gap-4 relative">
                            {sortedTeams.map((team, index) => { // index를 받아옴 (애니메이션 scale 등에 사용)
                                const currentRank = teamRanks[team.key]; // 현재 팀의 실제 순위
                                // 사용자가 제공한 카드 className 구조를 최대한 따름
                                const rankBasedClass = currentRank === 1
                                    ? 'md:col-start-2 mt-0 md:mt-0'
                                    : (currentRank === 2
                                        ? 'md:col-start-1 mt-4 md:mt-10'
                                        : 'md:col-start-3 mt-4 md:mt-10');
                                const positionMasterClass = gridPositions[currentRank] || ""; // 기본 포지션 클래스

                                return (
                                    <motion.div
                                        key={team.key}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        // 사용자의 scale 로직 (index 기반) 유지
                                        animate={{ opacity: 1, y: 0, scale: index === 0 ? 1.05 : (index === 1 || index === 2 ? 0.95 : 0.9) }}
                                        transition={{ duration: 0.5, layout: { duration: 0.5, type: "spring" } }}
                                        // className 결합: 포지션 마스터 클래스 + 사용자 정의 랭크 기반 클래스 (중복될 수 있으나 사용자의 의도 존중)
                                        className={`${positionMasterClass} ${rankBasedClass}`}
                                    >
                                        <TeamScoreCard
                                            team={team}
                                            score={scores[team.key]}
                                            rank={currentRank} // 실제 순위 전달
                                            onClick={() => handleTeamClick(team.dbClickId, team.key)}
                                            feverGaugeValue={feverGauges[team.key]}
                                            isFeverActive={feverActive[team.key]}
                                            feverGaugeMax={FEVER_GAUGE_MAX}
                                        />
                                    </motion.div>
                                );
                            })}
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
export default ClickBattle;