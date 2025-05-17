import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import {
    Typography,
} from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid"; // ID 생성용

const WEBSOCKET_URL = 'ws://ahnai1.suwon.ac.kr:5041/ws-click';
const SEND_DESTINATION = '/app/click';
const RECEIVE_DESTINATION = '/topic/clicks';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const TEAMS_CONFIG = [
    { key: "ict", name: "정보통신학부", dbClickId: 1, color: "blue", tailwindColor: "blue-500", hoverColor: "blue-700", textColor: "text-blue-600" },
    { key: "data", name: "데이터과학부", dbClickId: 2, color: "green", tailwindColor: "green-500", hoverColor: "green-700", textColor: "text-green-600" },
    { key: "computer", name: "컴퓨터학부", dbClickId: 3, color: "orange", tailwindColor: "orange-500", hoverColor: "orange-700", textColor: "text-orange-600" },
];

const CLICK_ID_TO_TEAM_KEY_MAP = TEAMS_CONFIG.reduce((acc, team) => {
    acc[team.dbClickId] = team.key;
    return acc;
}, {});

function ScoreCard({ team, score, onClick }) {
    const [floatingTexts, setFloatingTexts] = useState([]);

    const handleClick = () => {
        const id = uuidv4();
        const randomLeft = Math.random() * 80 + 10; // 10% ~ 90% 위치
        setFloatingTexts(prev => [...prev, { id, left: randomLeft }]);
        setTimeout(() => {
            setFloatingTexts(prev => prev.filter(text => text.id !== id));
        }, 1000);

        onClick();
    };

    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4">
            <div className="text-center p-6 md:p-8">
                <h4 className={`block antialiased tracking-normal font-sans text-2xl leading-snug text-blue-600 mb-4 font-bold ${team.textColor} `}>{team.name}</h4>
                <h1 className="block antialiased tracking-normal font-sans text-blue-gray-900 mb-10 font-extrabold text-7xl">{score}</h1>
                <button
                    onClick={handleClick}
                    className={`align-middle select-none font-sans text-center uppercase disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3.5 px-7 rounded-lg text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full text-lg font-semibold transition-all hover:scale-105 active:scale-95 bg-${team.tailwindColor} hover:bg-${team.hoverColor}`}
                >
                    클릭!
                </button>
                <AnimatePresence>
                    {floatingTexts.map(({ id, left }) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: -30 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute text-red-500 font-bold text-xl pointer-events-none"
                            style={{ top: "30%", left: `${left}%` }}
                        >
                            +1
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export function Minigame() {
    const initialScoresState = TEAMS_CONFIG.reduce((acc, team) => {
        acc[team.key] = 0;
        return acc;
    }, {});
    const [scores, setScores] = useState(initialScoresState);
    const [isConnected, setIsConnected] = useState(false);
    const clientRef = useRef(null);

    useEffect(() => {
        const fetchInitialScores = async () => {
            try {
                const response = await fetch('http://ahnai1.suwon.ac.kr:5041/click-num');
                const initialDataArray = await response.json();
                setScores(prevScores => {
                    const updatedScores = { ...initialScoresState };
                    initialDataArray.forEach(item => {
                        const teamKey = CLICK_ID_TO_TEAM_KEY_MAP[item.clinkId];
                        if (teamKey) {
                            updatedScores[teamKey] = item.clickNum;
                        }
                    });
                    return updatedScores;
                });
            } catch (error) {
                console.error("초기 점수를 가져오는 데 실패했습니다:", error);
            }
        };

        fetchInitialScores();

        const client = new Client({
            brokerURL: WEBSOCKET_URL,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = function () {
            setIsConnected(true);
            client.subscribe(RECEIVE_DESTINATION, (message) => {
                if (message.body) {
                    try {
                        const updatedClickData = JSON.parse(message.body);
                        const teamKey = CLICK_ID_TO_TEAM_KEY_MAP[updatedClickData.clickId];
                        if (teamKey) {
                            setScores(prevScores => ({
                                ...prevScores,
                                [teamKey]: updatedClickData.clickNum
                            }));
                        }
                    } catch (e) {
                        console.error("WebSocket 메시지 파싱 중 오류:", e);
                    }
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
            if (clientRef.current?.connected) {
                clientRef.current.deactivate();
            }
            setIsConnected(false);
        };
    }, []);

    const handleTeamClick = (teamDbClickId) => {
        if (clientRef.current?.connected && isConnected) {
            const clickMessageToServer = { clickId: teamDbClickId };
            try {
                clientRef.current.publish({
                    destination: SEND_DESTINATION,
                    body: JSON.stringify(clickMessageToServer),
                });
            } catch (e) {
                console.error("클릭 메시지 발행 중 오류:", e);
            }
        } else {
            alert("서버에 연결되지 않았습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    return (
        <>
            <div className="relative flex h-[40vh] content-center items-center justify-center bg-gray-900 md:h-[50vh]">
                <div className="max-w-8xl container relative mx-auto text-center">
                    <Typography variant="h1" color="white" className="mb-6 font-black text-4xl md:text-5xl">
                        클릭 배틀!
                    </Typography>
                    <Typography variant="lead" color="white" className="opacity-80 text-lg md:text-xl">
                        팀을 선택하여 클릭 점수를 올려보세요!
                    </Typography>
                    <Typography variant="small" className={`mt-4 font-semibold ${isConnected ? "text-green-400" : "text-red-400"}`}>
                        {isConnected ? "온라인 - 서버 연결됨" : "오프라인 - 서버 연결 안됨"}
                    </Typography>
                </div>
            </div>
            {/* 게임 섹션 */}
            <section className="-mt-16 bg-gray-100 px-4 pb-16 pt-8 md:-mt-20 md:pt-12">
                <div className="container mx-auto max-w-screen-lg">
                    {/* 조건부 렌더링: 연결되었거나, 또는 점수가 하나라도 0보다 크면 (초기 데이터 로드 성공시) UI 표시 */}
                    {isConnected || Object.values(scores).some(s => s > 0) ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
                            {TEAMS_CONFIG.map((team, index) => (
                                <motion.div
                                    key={team.key}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={fadeIn}
                                >
                                    <ScoreCard team={team} score={scores[team.key]} onClick={() => handleTeamClick(team.dbClickId)} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <Typography variant="h4" color="blue-gray">
                                { clientRef.current && clientRef.current.active ? "초기 데이터를 불러오고 있습니다..." : "서버에 연결 중입니다..." }
                            </Typography>
                            <Typography variant="small" color="gray" className="mt-2">
                                잠시만 기다려주세요. 문제가 지속되면 페이지를 새로고침하거나 관리자에게 문의하세요.
                            </Typography>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
