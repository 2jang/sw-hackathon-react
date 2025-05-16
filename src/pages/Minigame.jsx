// frontend/src/Minigame.jsx (또는 App.jsx 등)

import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { motion } from "framer-motion";

// Spring Boot 백엔드 WebSocket STOMP 엔드포인트
// 백엔드 서버 주소 및 포트에 맞게 수정하세요.
const SOCKET_URL = 'ws://localhost:8080/ws-click'; // 예시: Spring Boot 기본 포트 8080

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

// 팀 정보 및 백엔드 clickId 매핑
const TEAMS_CONFIG = [
    { key: "computer", name: "컴퓨터학부", dbClickId: 1, color: "blue", tailwindColor: "blue-500", hoverColor: "blue-700", textColor: "text-blue-600" },
    { key: "ict", name: "정보통신학부", dbClickId: 2, color: "green", tailwindColor: "green-500", hoverColor: "green-700", textColor: "text-green-600" },
    { key: "data", name: "데이터학부", dbClickId: 3, color: "orange", tailwindColor: "orange-500", hoverColor: "orange-700", textColor: "text-orange-600" },
];

// dbClickId를 프론트엔드 팀 키로 변환하기 위한 맵
const CLICK_ID_TO_TEAM_KEY_MAP = TEAMS_CONFIG.reduce((acc, team) => {
    acc[team.dbClickId] = team.key;
    return acc;
}, {});


export function Minigame() {
    // 초기 점수 객체 생성
    const initialScores = TEAMS_CONFIG.reduce((acc, team) => {
        acc[team.key] = 0;
        return acc;
    }, {});
    const [scores, setScores] = useState(initialScores);
    const [isConnected, setIsConnected] = useState(false);
    const clientRef = useRef(null);

    useEffect(() => {
        const client = new Client({
            brokerURL: SOCKET_URL,
            connectHeaders: {
                // Spring Security 등 사용 시 필요한 헤더 추가 가능
                // login: 'user',
                // passcode: 'password',
            },
            debug: function (str) {
                console.log('STOMP DEBUG: ' + str);
            },
            reconnectDelay: 5000, // 5초마다 재연결 시도
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = function (frame) {
            setIsConnected(true);
            console.log('STOMP: Connected to ' + SOCKET_URL, frame);

            // '/topic/clicks' 경로를 구독하여 서버로부터 점수 업데이트 수신
            client.subscribe('/topic/clicks', (message) => {
                if (message.body) {
                    try {
                        const updatedClickData = JSON.parse(message.body); // { clickId: Long, clickNum: Integer }
                        console.log('Received from /topic/clicks:', updatedClickData);

                        const teamKey = CLICK_ID_TO_TEAM_KEY_MAP[updatedClickData.clickId];
                        if (teamKey) {
                            setScores(prevScores => ({
                                ...prevScores,
                                [teamKey]: updatedClickData.clickNum
                            }));
                        } else {
                            console.warn("Received click data for unknown clickId:", updatedClickData.clickId);
                        }
                    } catch (e) {
                        console.error("Error parsing message from /topic/clicks", e, message.body);
                    }
                }
            });

            // (선택 사항) 연결 시 초기 점수 요청 로직
            // 백엔드에 '/app/getInitialScores'와 같은 엔드포인트가 있다면 요청 가능
            // TEAMS_CONFIG.forEach(team => {
            //    client.publish({ destination: '/app/getScore', body: JSON.stringify({ clickId: team.dbClickId }) });
            // });
            // 또는 서버가 연결 시 /topic/clicks 로 모든 점수를 보내주도록 구현할 수도 있습니다.
            // 현재 제공된 백엔드 코드는 클릭 시에만 해당 클릭 ID의 점수를 보내줍니다.
            // 따라서, 초기 점수는 0으로 시작하고 클릭을 통해 업데이트 됩니다.
            // 모든 팀의 초기 점수를 가져오려면 백엔드에 추가적인 구현이 필요할 수 있습니다.
        };

        client.onStompError = function (frame) {
            console.error('STOMP: Broker reported error: ' + frame.headers['message']);
            console.error('STOMP: Additional details: ' + frame.body);
            setIsConnected(false);
        };

        client.onDisconnect = function () {
            setIsConnected(false);
            console.log('STOMP: Disconnected!');
        };

        // 연결 활성화
        client.activate();
        clientRef.current = client; // 참조 저장

        // 컴포넌트 언마운트 시 연결 비활성화
        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, []); // 빈 배열로 전달하여 컴포넌트 마운트 시 1회만 실행

    const handleTeamClick = (teamDbClickId) => {
        if (clientRef.current && isConnected) {
            const clickMessage = {
                clickId: teamDbClickId // 백엔드가 받을 clickId
            };
            try {
                clientRef.current.publish({
                    destination: '/app/click', // Spring @MessageMapping("/click") 경로
                    body: JSON.stringify(clickMessage)
                });
                console.log('Sent to /app/click:', clickMessage);
            } catch (e) {
                console.error("Error publishing click message", e);
            }
        } else {
            alert("서버에 연결되지 않았습니다. 잠시 후 다시 시도해주세요.");
            console.error('STOMP: 클라이언트가 연결되지 않았거나 준비되지 않았습니다.');
        }
    };

    return (
        <>
            {/* Hero Section - 게임 타이틀 */}
            <div className="relative flex h-[40vh] content-center items-center justify-center bg-gray-900 md:h-[50vh]">
                <div className="max-w-8xl container relative mx-auto text-center">
                    <Typography variant="h1" color="white" className="mb-6 font-black text-4xl md:text-5xl">
                        클릭 배틀
                    </Typography>
                    <Typography variant="small" color={isConnected ? "green" : "red"} className="mt-4 font-semibold">
                        {isConnected ? "온라인 - 서버 연결됨" : "오프라인 - 서버 연결 확인 중..."}
                    </Typography>
                </div>
            </div>

            {/* 게임 섹션 - 팀별 점수판 및 버튼 */}
            <section className="-mt-16 bg-gray-100 px-4 pb-16 pt-8 md:-mt-20 md:pt-12">
                <div className="container mx-auto max-w-screen-lg">
                    {isConnected ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
                            {TEAMS_CONFIG.map((team, index) => (
                                <motion.div
                                    key={team.key}
                                    variants={fadeIn}
                                    initial="hidden"
                                    animate="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    custom={index}
                                >
                                    <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4" style={{borderColor: team.tailwindColor}}>
                                        <CardBody className="text-center p-6 md:p-8">
                                            <Typography variant="h4" className={`${team.textColor} mb-4 font-bold`}>
                                                {team.name}
                                            </Typography>
                                            <Typography variant="h1" color="blue-gray" className="mb-10 font-extrabold text-7xl">
                                                {scores[team.key] !== undefined ? scores[team.key].toLocaleString() : 0}
                                            </Typography>
                                            <Button
                                                color={team.color}
                                                size="lg"
                                                className={`w-full text-lg font-semibold transition-all hover:scale-105 active:scale-95 bg-${team.tailwindColor} hover:bg-${team.hoverColor}`}
                                                onClick={() => handleTeamClick(team.dbClickId)} // team.dbClickId 사용
                                                disabled={!isConnected}
                                                ripple={true}
                                            >
                                                클릭!
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <Typography variant="h4" color="blue-gray">
                                서버에 연결 중입니다. 잠시만 기다려주세요...
                            </Typography>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

// Create React App의 경우 App.js에서 이 컴포넌트를 사용하거나,
// 이 파일 자체를 App.js로 만들 수 있습니다.
export default Minigame; // 필요에 따라 export default 추가