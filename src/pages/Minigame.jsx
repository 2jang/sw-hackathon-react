import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { motion } from "framer-motion";

const WEBSOCKET_URL = 'ws://ahnai1.suwon.ac.kr:5041/ws-click';
const SEND_DESTINATION = '/app/click';                         // STOMP 메시지 전송 목적지
const RECEIVE_DESTINATION = '/topic/clicks';                   // STOMP 메시지 받을 목적지

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

export function Minigame() {
    const initialScoresState = TEAMS_CONFIG.reduce((acc, team) => {
        acc[team.key] = 0;
        return acc;
    }, {});
    const [scores, setScores] = useState(initialScoresState);
    const [isConnected, setIsConnected] = useState(false);
    const clientRef = useRef(null);

    // 연결 상태 변경 로깅
    useEffect(() => {
        console.log(`[CONNECTION_STATE_CHANGE] isConnected가 다음으로 설정됨: ${isConnected}`);
    }, [isConnected]);

    useEffect(() => {
        console.log('[EFFECT_MOUNT] Minigame 컴포넌트가 마운트되었습니다. 초기화 중...');

        const fetchInitialScores = async () => {
            console.log('[HTTP_FETCH] 초기 점수 가져오기 시도 중...');
            try {
                const apiUrl = '/api/click-num'; // Vite 프록시를 사용하기 위해 상대 경로로 변경
                console.log(`[HTTP_FETCH] 프록시를 통해 ${apiUrl}에서 초기 점수 요청 중`);
                const response = await fetch(apiUrl); // Vite 개발 서버가 이 요청을 프록시함

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`[HTTP_FETCH_ERROR] HTTP 오류! 상태: ${response.status} (프록시됨) ${apiUrl}에서 가져오는 중. 응답 본문: ${errorText}`);
                    throw new Error(`HTTP 오류! 상태: ${response.status} (프록시됨) ${apiUrl}에서 가져오는 중`);
                }
                const initialDataArray = await response.json();
                console.log('[HTTP_FETCH_SUCCESS] 초기 점수 데이터 가져오기 성공:', initialDataArray);

                setScores(prevScores => {
                    const updatedScores = { ...initialScoresState };
                    initialDataArray.forEach(item => {
                        // API 응답의 'clinkId' 필드 사용
                        const teamKey = CLICK_ID_TO_TEAM_KEY_MAP[item.clinkId];
                        if (teamKey) {
                            updatedScores[teamKey] = item.clickNum;
                            console.log(`[HTTP_FETCH_PROCESS] ${teamKey} (clinkId: ${item.clinkId})의 초기 점수가 ${item.clickNum}(으)로 설정됨`);
                        } else {
                            console.warn(`[HTTP_FETCH_PROCESS_WARN] REST API에서 알 수 없는 clinkId(${item.clinkId})에 대한 초기 점수를 가져왔습니다. 원시 항목:`, item);
                        }
                    });
                    console.log('[HTTP_FETCH_PROCESS] 초기 점수 처리 완료. 새로운 점수 상태:', updatedScores);
                    return updatedScores;
                });

            } catch (error) {
                console.error("[HTTP_FETCH_FAILURE] 초기 점수를 가져오는 데 실패했습니다 (프록시 및 백엔드 CORS 확인 - HTTP):", error);
            }
        };

        fetchInitialScores();

        console.log('[STOMP_SETUP] STOMP 클라이언트 인스턴스 생성 중...');
        const client = new Client({
            brokerURL: WEBSOCKET_URL,
            connectHeaders: {
                // login: "user", // 필요한 경우 인증 헤더 추가
                // passcode: "password",
            },
            debug: function (str) {
                // 이는 로우 레벨 STOMP 프로토콜 메시지를 제공합니다.
                console.log('[STOMP_NATIVE_DEBUG] ' + str);
            },
            reconnectDelay: 5000, // ms
            heartbeatIncoming: 4000, // ms
            heartbeatOutgoing: 4000, // ms
            // logRawCommunication: true, // 필요한 경우 더 자세한 (바이너리) 로깅을 위해 사용, 일반적으로 너무 장황함
        });
        console.log(`[STOMP_SETUP] STOMP 클라이언트가 brokerURL: ${WEBSOCKET_URL}로 인스턴스화되었습니다.`);

        client.onConnect = function (frame) {
            console.log('[STOMP_CONNECT_SUCCESS] STOMP: ' + WEBSOCKET_URL + '에 연결되었습니다.');
            console.log('[STOMP_CONNECT_SUCCESS] 연결 프레임:', frame);
            setIsConnected(true); // 연결 상태 설정

            console.log(`[STOMP_SUBSCRIBE] 다음 대상으로 구독 시도 중: ${RECEIVE_DESTINATION}`);
            try {
                const subscription = client.subscribe(RECEIVE_DESTINATION, (message) => {
                        console.log(`[STOMP_MESSAGE_RECEIVED] ${RECEIVE_DESTINATION}에서 받은 원시 메시지:`, message);
                        if (message.body) {
                            console.log(`[STOMP_MESSAGE_RECEIVED] 메시지 본문: ${message.body}`);
                            try {
                                const updatedClickData = JSON.parse(message.body);
                                // WebSocket 메시지는 'clickId'를 사용
                                console.log(`[STOMP_MESSAGE_PROCESS] ${RECEIVE_DESTINATION}에서 파싱된 메시지:`, updatedClickData);
                                const teamKey = CLICK_ID_TO_TEAM_KEY_MAP[updatedClickData.clickId];
                                if (teamKey) {
                                    setScores(prevScores => {
                                        const newScores = {
                                            ...prevScores,
                                            [teamKey]: updatedClickData.clickNum
                                        };
                                        console.log(`[STOMP_MESSAGE_PROCESS] ${teamKey} 팀의 점수를 ${updatedClickData.clickNum}(으)로 업데이트 중. 새로운 점수:`, newScores);
                                        return newScores;
                                    });
                                } else {
                                    console.warn(`[STOMP_MESSAGE_PROCESS_WARN] 알 수 없는 clickId(${updatedClickData.clickId})에 대한 WebSocket 업데이트를 받았습니다. 원시 데이터:`, updatedClickData);
                                }
                            } catch (e) {
                                console.error(`[STOMP_MESSAGE_PARSE_ERROR] ${RECEIVE_DESTINATION}에서 WebSocket 메시지 파싱 중 오류 발생. 오류:`, e, "원시 본문:", message.body);
                            }
                        } else {
                            console.warn(`[STOMP_MESSAGE_RECEIVED_WARN] ${RECEIVE_DESTINATION}에서 빈 본문으로 메시지를 받았습니다.`);
                        }
                    },
                    {
                        // id: 'my-subscription-id', // 선택 사항: 사용자 정의 구독 ID
                        // ack: 'client', // 선택 사항: 클라이언트 확인용
                    });
                console.log(`[STOMP_SUBSCRIBE_SUCCESS] ${RECEIVE_DESTINATION}에 성공적으로 구독했습니다. 구독 객체:`, subscription);
            } catch (error) {
                console.error(`[STOMP_SUBSCRIBE_ERROR] ${RECEIVE_DESTINATION} 구독 중 오류 발생:`, error);
            }
        };

        client.onDisconnect = function (frame) {
            // 이 콜백은 클라이언트가 서버에서 연결 해제되었을 때 호출됩니다.
            // `frame` 인수는 현재 이 콜백에 대해 정의되지 않았습니다.
            console.warn('[STOMP_DISCONNECT] STOMP: ' + WEBSOCKET_URL + '에서 연결 해제됨');
            console.warn('[STOMP_DISCONNECT] 연결 해제 프레임 (일반적으로 이 콜백에 대해 정의되지 않음):', frame);
            setIsConnected(false);
        };

        client.onStompError = function (frame) {
            // STOMP 브로커가 클라이언트에 ERROR 프레임을 반환하면 호출됩니다.
            console.error('[STOMP_ERROR] STOMP: 브로커가 오류를 보고했습니다.');
            console.error('[STOMP_ERROR] 오류 프레임 헤더:', frame.headers);
            console.error('[STOMP_ERROR] 오류 프레임 본문:', frame.body);
            console.error(`[STOMP_ERROR] 오류 메시지: ${frame.headers['message']}`);
            console.error(`[STOMP_ERROR] 추가 세부 정보: ${frame.body}`);
            setIsConnected(false); // 오류는 연결 끊김 또는 작동 불능을 의미한다고 가정
        };

        client.onWebSocketError = (event) => {
            // 브라우저가 연결에 실패하는 등의 WebSocket 오류가 발생하면 호출됩니다.
            console.error('[WEBSOCKET_ERROR] WebSocket 오류 관찰됨:', event);
            // 자세한 오류 정보는 이벤트 객체 구조를 검사해야 할 수 있습니다.
            // 일부 오류(예: 연결 거부)는 연결 라이프사이클에서 발생하는 시점에 따라
            // onDisconnect 또는 onStompError를 트리거할 수도 있습니다.
            setIsConnected(false);
        };

        client.onWebSocketClose = (event) => {
            console.warn('[WEBSOCKET_CLOSE] WebSocket 연결이 닫혔습니다.');
            console.warn('[WEBSOCKET_CLOSE] 닫힘 이벤트 코드:', event.code);
            console.warn('[WEBSOCKET_CLOSE] 닫힘 이벤트 이유:', event.reason);
            console.warn('[WEBSOCKET_CLOSE] 정상적인 닫힘 여부:', event.wasClean);
            console.warn('[WEBSOCKET_CLOSE] 전체 이벤트 객체:', event);
            setIsConnected(false); // 이 상태를 반영하도록 보장
            // onDisconnect도 호출되는 경우 중복될 수 있지만 명시적 로깅에 유용합니다.
        };

        console.log('[STOMP_ACTIVATE] STOMP 클라이언트 활성화 시도 중 (WebSocket에 연결)...');
        client.activate();
        clientRef.current = client;
        console.log('[STOMP_SETUP] STOMP 클라이언트가 clientRef.current에 할당되었습니다.');

        return () => {
            console.log('[EFFECT_CLEANUP] Minigame 컴포넌트 언마운트 중 또는 useEffect 재실행 중. STOMP 연결 정리 중...');
            if (clientRef.current) {
                if (clientRef.current.connected) { // 또는 clientRef.current.active
                    console.log('[STOMP_DEACTIVATE] STOMP 클라이언트가 활성 상태입니다. 비활성화 시도 중...');
                    try {
                        clientRef.current.deactivate();
                        // 참고: deactivate()는 성공/실패에 대한 콜백을 직접 갖지 않을 수 있습니다.
                        // 성공하면 onDisconnect를 트리거합니다.
                        console.log('[STOMP_DEACTIVATE_COMMAND_SENT] STOMP 비활성화 명령 전송됨. 확인을 위해 onDisconnect를 모니터링하세요.');
                    } catch (e) {
                        console.error('[STOMP_DEACTIVATE_ERROR] client.deactivate() 중 오류 발생:', e);
                    }
                } else {
                    console.log('[STOMP_DEACTIVATE] STOMP 클라이언트가 활성/연결 상태가 아니었습니다. 비활성화가 필요 없거나 이미 연결 해제되었습니다.');
                }
            } else {
                console.log('[STOMP_DEACTIVATE] clientRef.current가 null입니다. 비활성화할 STOMP 클라이언트가 없습니다.');
            }
            setIsConnected(false); // 정리 시 연결 해제 상태 보장
        };
    }, []); // 빈 의존성 배열은 마운트 시 한 번 실행되고 언마운트 시 정리되도록 합니다.

    const handleTeamClick = (teamDbClickId) => {
        console.log(`[BUTTON_CLICK] dbClickId: ${teamDbClickId}에 대한 팀 버튼 클릭됨`);
        if (clientRef.current && clientRef.current.connected && isConnected) { // STOMP 상태에 대해 clientRef.current.connected 확인
            const clickMessageToServer = { clickId: teamDbClickId }; // WebSocket 메시지는 'clickId' 사용
            console.log(`[STOMP_PUBLISH_ATTEMPT] ${SEND_DESTINATION}에 메시지 발행 시도 중. 메시지:`, clickMessageToServer);
            try {
                clientRef.current.publish({
                    destination: SEND_DESTINATION,
                    body: JSON.stringify(clickMessageToServer),
                    // headers: { 'priority': '9' } // 선택적 헤더
                });
                console.log(`[STOMP_PUBLISH_SUCCESS] ${SEND_DESTINATION}에 성공적으로 메시지를 발행했습니다. 메시지:`, clickMessageToServer);
            } catch (e) {
                console.error(`[STOMP_PUBLISH_ERROR] ${SEND_DESTINATION}에 클릭 메시지 발행 중 오류 발생. 오류:`, e, "시도한 메시지:", clickMessageToServer);
            }
        } else {
            console.warn(`[STOMP_PUBLISH_DENIED] 발행할 수 없습니다. STOMP 클라이언트가 연결되지 않았거나 활성 상태가 아닙니다.`);
            console.warn(`[STOMP_PUBLISH_DENIED] clientRef.current:`, clientRef.current);
            console.warn(`[STOMP_PUBLISH_DENIED] clientRef.current.connected: ${clientRef.current ? clientRef.current.connected : 'N/A'}`);
            console.warn(`[STOMP_PUBLISH_DENIED] isConnected (상태): ${isConnected}`);
            alert("서버에 연결되지 않았습니다. 잠시 후 다시 시도해주세요. (연결 상태를 콘솔에서 확인하세요)");
        }
    };

    // JSX 렌더링 부분
    return (
        <>
            {/* Hero Section */}
            <div className="relative flex h-[40vh] content-center items-center justify-center bg-gray-900 md:h-[50vh]">
                <div className="max-w-8xl container relative mx-auto text-center">
                    <Typography variant="h1" color="white" className="mb-6 font-black text-4xl md:text-5xl">
                        클릭 배틀!
                    </Typography>
                    <Typography variant="lead" color="white" className="opacity-80 text-lg md:text-xl">
                        {/* 메시지 추가 가능 */}
                    </Typography>
                    <Typography variant="small" className={`mt-4 font-semibold ${isConnected ? "text-green-400" : "text-red-400"}`}>
                        {isConnected ? "온라인 - 서버 연결됨" : "오프라인 - 서버 연결 확인 중..."}
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
                                                {scores[team.key] !== undefined ? scores[team.key].toLocaleString() : '0'}
                                            </Typography>
                                            <Button
                                                color={team.color} // Material Tailwind color prop
                                                size="lg"
                                                className={`w-full text-lg font-semibold transition-all hover:scale-105 active:scale-95 bg-${team.tailwindColor} hover:bg-${team.hoverColor}`}
                                                onClick={() => handleTeamClick(team.dbClickId)}
                                                disabled={!isConnected} // 연결되지 않은 경우 버튼 비활성화
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
export default Minigame;