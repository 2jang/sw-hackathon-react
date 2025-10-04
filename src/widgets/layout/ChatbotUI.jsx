import React, { useState, useRef, useEffect } from "react";
import "/src/assets/css/App.css";
import {
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import {
    ChatBubbleOvalLeftEllipsisIcon,
    PaperAirplaneIcon,
    XMarkIcon,
    CpuChipIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const initialMessagesForDebugging = [
    { id: 1, text: "안녕하세요! 저는 수원아이입니다. 무엇을 도와드릴까요?", sender: "bot" },
];

// 디버깅 모드 활성화 여부 (true = 활성화, false = 비활성화)
const DEBUG_MODE = false;

// 🚀 더 안전한 버전 (추천): 자동 URL 감지 함수
const getApiUrl = () => {
    const currentHostname = window.location.hostname;
    const currentPort = window.location.port;
    const currentProtocol = window.location.protocol;
    
    // 현재 도메인이 suwonai.2jang.dev 또는 suwonai.2jang.dev인 경우 상대 경로 사용
    if (currentHostname.includes('2jang.dev')) {
        return '/route/stream';
    }
    
    // localhost에서 개발하는 경우
    if (currentHostname === 'localhost' || currentHostname === '127.0.0.1') {
        // Vite 개발 서버 포트인 경우 nginx 프록시 경유
        if (currentPort === '5173') {
            return 'http://suwonai.2jang.dev/route/stream';
        }
        // 다른 포트인 경우에도 nginx 프록시 경유 시도
        return 'http://suwonai.2jang.dev/route/stream';
    }
    
    // IP 주소로 접근하는 경우
    if (/^\d+\.\d+\.\d+\.\d+$/.test(currentHostname)) {
        return 'http://suwonai.2jang.dev/route/stream';
    }
    
    // 기본값: 상대 경로 (nginx 프록시 경유)
    return '/route/stream';
};

// 🔧 기타 API URL들도 자동 감지
const getApiBaseUrl = () => {
    const currentHostname = window.location.hostname;
    const currentProtocol = window.location.protocol;
    
    if (currentHostname.includes('2jang.dev')) {
        return `${currentProtocol}//${currentHostname}`;
    }
    
    if (currentHostname === 'localhost' || currentHostname === '127.0.0.1') {
        return 'http://suwonai.2jang.dev';
    }
    
    if (/^\d+\.\d+\.\d+\.\d+$/.test(currentHostname)) {
        return 'http://suwonai.2jang.dev';
    }
    
    return window.location.origin;
};

// 🚀 API 클라이언트 클래스 (자동 감지 기반)
class ApiClient {
    constructor() {
        this.baseURL = getApiBaseUrl();
        this.streamUrl = getApiUrl();
        
        if (DEBUG_MODE) {
            console.log('🔧 API 클라이언트 초기화:', {
                baseURL: this.baseURL,
                streamUrl: this.streamUrl,
                currentLocation: window.location.href,
                hostname: window.location.hostname,
                port: window.location.port
            });
        }
    }

    // 스트리밍 채팅 API 호출
    async streamChat(question) {
        try {
            if (DEBUG_MODE) {
                console.log(`🔗 API 요청: ${this.streamUrl}`);
                console.log(`📝 질문: ${question}`);
            }

            const response = await fetch(this.streamUrl, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
            }

            if (DEBUG_MODE) {
                console.log('✅ API 응답 성공:', response.status);
            }

            return response;
        } catch (error) {
            console.error('❌ API 요청 실패:', error);
            throw error;
        }
    }

    // 클릭 번호 API 호출
    async getClickNumber() {
        const url = `${this.baseURL}/click-num`;
        
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (DEBUG_MODE) {
                console.error('❌ Click API 실패:', error);
            }
            throw error;
        }
    }

    // 수원 네비 API 호출
    async getSuwonNavi(data) {
        const url = `${this.baseURL}/suwon-navi`;
        
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (DEBUG_MODE) {
                console.error('❌ Suwon Navi API 실패:', error);
            }
            throw error;
        }
    }

    // 연결 테스트
    async testConnection() {
        try {
            const response = await fetch(`${this.baseURL}/click-num`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

export function ChatbotUI() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(initialMessagesForDebugging);
    //const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [botInput, setBotInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingMessage, setStreamingMessage] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('unknown'); // 연결 상태 추가

    const messagesEndRef = useRef(null);
    const userInputRef = useRef(null);
    const botInputRef = useRef(null);
    
    // 🔧 API 클라이언트 인스턴스 (자동 감지 기반)
    const apiClient = useRef(new ApiClient());

    // 크기 토글 함수
    const toggleSize = () => setIsExpanded((prev) => !prev);

    // 크기에 따라 스타일 클래스 또는 크기 값 변경
    const containerWidth = isExpanded ? "w-[480px]" : "w-96";
    const containerHeight = isExpanded ? "h-[720px]" : "h-[600px]";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, streamingMessage, isOpen]);

    useEffect(() => {
        // 🔍 컴포넌트 마운트 시 API URL 확인 및 연결 테스트
        const initializeApi = async () => {
            const detectedUrl = getApiUrl();
            const baseUrl = getApiBaseUrl();
            
            if (DEBUG_MODE) {
                console.log('🌐 자동 감지된 API 설정:', {
                    streamUrl: detectedUrl,
                    baseUrl: baseUrl,
                    location: {
                        hostname: window.location.hostname,
                        port: window.location.port,
                        protocol: window.location.protocol,
                        href: window.location.href
                    }
                });
            }

            // 연결 테스트 (백그라운드에서)
            try {
                const isConnected = await apiClient.current.testConnection();
                setConnectionStatus(isConnected ? 'connected' : 'disconnected');
                
                if (DEBUG_MODE) {
                    console.log(`🔌 연결 상태: ${isConnected ? '✅ 연결됨' : '❌ 연결 실패'}`);
                }
            } catch (error) {
                setConnectionStatus('error');
                if (DEBUG_MODE) {
                    console.error('🔌 연결 테스트 실패:', error);
                }
            }
        };

        initializeApi();
    }, []);

    const toggleChatbot = () => setIsOpen(!isOpen);

    function formatBotResponse(text) {
        // "숫자. "로 시작하는 패턴을 줄바꿈 처리
        return text.replace(/(?<!^)(?=\s*\d+\.)/g, "\n");
    }

    const typewriterEffect = async (text, onChar) => {
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            onChar(char);
            await new Promise((resolve) => setTimeout(resolve, 25)); // 속도 조절 가능
        }
    };

    const handleSend = async () => {
        if (!userInput.trim() || isStreaming) return;

        const userMessage = {
            id: Date.now(),
            text: userInput,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        const currentUserInput = userInput; // 입력값 보존
        setUserInput("");
        setStreamingMessage("");
        setIsStreaming(true);

        // 재시도 로직 (최대 3번)
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount <= maxRetries) {
            try {
                if (DEBUG_MODE) {
                    console.log(`🔄 API 호출 시도 ${retryCount + 1}/${maxRetries + 1}`);
                    console.log(`🔗 사용할 URL: ${apiClient.current.streamUrl}`);
                }

                // 🔧 자동 감지된 URL로 API 호출
                const res = await apiClient.current.streamChat(currentUserInput);

                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let result = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    result += chunk;
                }

                // JSON 파싱 (옵션)
                let parsed = result;
                try {
                    const json = JSON.parse(result);
                    if (json.llmResponse) {
                        parsed = json.llmResponse;
                    }
                } catch (e) {
                    if (DEBUG_MODE) {
                        console.warn("⚠️ 응답 파싱 실패 → 원본 그대로 출력");
                    }
                }

                // 🧠 줄바꿈 포함된 최종 출력 텍스트
                const formatted = formatBotResponse(parsed);

                // 🔠 타자 효과 적용
                await typewriterEffect(formatted, (char) => {
                    setStreamingMessage((prev) => prev + char);
                });

                setMessages((prev) => [
                    ...prev,
                    { id: Date.now() + 1, text: formatted, sender: "bot" },
                ]);
                setStreamingMessage("");

                // 성공 시 연결 상태 업데이트
                setConnectionStatus('connected');

                // 성공하면 루프 탈출
                break;

            } catch (err) {
                retryCount++;
                
                if (DEBUG_MODE) {
                    console.error(`❌ Streaming error (시도 ${retryCount}):`, err);
                }

                // 연결 상태 업데이트
                setConnectionStatus('error');

                if (retryCount > maxRetries) {
                    // 모든 재시도 실패
                    let errorMessage = "⚠️ 서버 연결에 실패했습니다.";
                    
                    if (err.name === 'AbortError') {
                        errorMessage = "⏱️ 요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.";
                    } else if (err.message.includes('HTTP error')) {
                        errorMessage = `🚫 서버 오류가 발생했습니다. (${err.message})`;
                    } else if (err.message.includes('fetch') || err.message.includes('NetworkError')) {
                        errorMessage = "🔌 네트워크 연결을 확인해주세요.";
                    } else if (err.message.includes('CORS')) {
                        errorMessage = "🌐 도메인 접근 권한이 없습니다. nginx 설정을 확인해주세요.";
                    }
                    
                    // 현재 URL 정보 포함 (디버깅용)
                    if (DEBUG_MODE) {
                        errorMessage += `\n\n🔧 디버깅 정보:\n- 요청 URL: ${apiClient.current.streamUrl}\n- 현재 도메인: ${window.location.hostname}:${window.location.port}`;
                    }
                    
                    setMessages((prev) => [
                        ...prev,
                        { id: Date.now() + 2, text: errorMessage, sender: "bot" },
                    ]);
                } else {
                    // 재시도 대기 (점진적 지연)
                    await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
                }
            }
        }

        setIsStreaming(false);
    };

    const handleBotSendMessage = () => {
        if (!botInput.trim()) return;
        const newMessage = {
            id: Date.now() + 1,
            text: botInput,
            sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setBotInput("");
        setTimeout(() => botInputRef.current?.focus(), 0);
    };

    // 🔍 현재 설정 표시 (디버깅용)
    const currentApiUrl = getApiUrl();
    const currentBaseUrl = getApiBaseUrl();

    // 연결 상태 아이콘
    const getConnectionIcon = () => {
        switch (connectionStatus) {
            case 'connected': return '🟢';
            case 'disconnected': return '🔴';
            case 'error': return '🟠';
            default: return '⚪';
        }
    };

    return (
        <>
            {!isOpen && (
                <div className="fixed bottom-6 right-6 z-[9999]">
                    <Button
                        color="blue"
                        variant="filled"
                        size="lg"
                        className="rounded-full p-4 shadow-lg"
                        onClick={toggleChatbot}
                    >
                        <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" />
                    </Button>
                </div>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chatbot-box"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 w-96 [@media(max-width:430px)]:w-[340px] h-[600px] shadow-xl z-[9999] bg-white rounded-2xl border border-blue-gray-50 flex flex-col overflow-hidden"
                    >
                        <div className={`fixed bottom-6 right-6 ${containerWidth} [@media(max-width:430px)]:w-[340px] ${containerHeight} shadow-xl z-[9999] bg-white rounded-2xl border border-blue-gray-50 flex flex-col overflow-hidden transition-all`}>
                            {/* 좌측 상단 크기 토글 스팟 */}
                            <button
                                onClick={toggleSize}
                                className={`absolute top-1 left-1 z-[10000] w-6 h-6 flex items-center justify-center text-xs font-bold inset-0 border-4 border-gray-400 rounded-full transform rotate-45 clip-half-circle-left hover:border-gray-600`}
                                title={isExpanded ? "줄이기" : "늘리기"}
                            >
                            </button>
                            {/* 헤더 */}
                            <div className="flex items-center justify-between p-3 bg-white border-b border-blue-gray-100 rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-blue-gray-700" />
                                    <Typography variant="h6" color="blue-gray">
                                        수원아이 SUWONAI
                                    </Typography>
                                    {DEBUG_MODE && (
                                        <span className="px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                            디버깅
                                        </span>
                                    )}
                                    {/* 🔧 연결 상태 표시 */}
                                    {DEBUG_MODE && (
                                        <span 
                                            className="px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full cursor-pointer" 
                                            title={`연결 상태: ${connectionStatus}\nAPI URL: ${currentApiUrl}\nBase URL: ${currentBaseUrl}`}
                                        >
                                            {getConnectionIcon()} API
                                        </span>
                                    )}
                                </div>
                                <IconButton variant="text" size="sm" onClick={toggleChatbot}>
                                    <XMarkIcon className="h-5 w-5" />
                                </IconButton>
                            </div>

                            {/* 메시지 영역 */}
                            <div className="flex-grow p-4 overflow-y-auto">
                                <div className="space-y-3">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
                                                    msg.sender === "user"
                                                        ? "bg-blue-100 text-black rounded-br-none"
                                                        : "bg-white text-black border border-blue-gray-100 rounded-bl-none"
                                                }`}
                                            >
                                                <Typography variant="small" className="break-words whitespace-pre-wrap break-word">
                                                    {msg.text}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}

                                    {/* 스트리밍 중 출력 */}
                                    {isStreaming && (
                                        <div className="flex justify-start items-center gap-2">
                                            <div className="max-w-[75%] p-3 rounded-xl shadow-sm bg-white text-black border border-blue-gray-100 rounded-bl-none">
                                                <Typography variant="small" className="break-words">
                                                    {streamingMessage}
                                                </Typography>
                                                <div className="flex items-center space-x-1 mt-[5px]">
                                                    <span className="dot dot1 w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                    <span className="dot dot2 w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                    <span className="dot dot3 w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* 입력 영역 */}
                            <div className="px-3 py-2 border-t border-blue-gray-100">
                                {DEBUG_MODE && (
                                    <>
                                        <div className="flex items-center gap-2 mb-2">
                                            <input
                                                ref={botInputRef}
                                                type="text"
                                                placeholder="봇 메시지 (디버깅용)"
                                                className="w-full px-3 py-2 text-sm border border-blue-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                                                value={botInput}
                                                onChange={(e) => setBotInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleBotSendMessage()}
                                            />
                                            <button
                                                className="p-2 text-white bg-blue-gray-500 rounded-full hover:bg-blue-gray-600 focus:outline-none"
                                                onClick={handleBotSendMessage}
                                            >
                                                <CpuChipIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                        {/* API URL 정보 표시 */}
                                        <div className="mb-2 p-2 text-xs bg-gray-100 rounded border">
                                            <strong>Stream API:</strong> {currentApiUrl}<br/>
                                            <strong>Base URL:</strong> {currentBaseUrl}<br/>
                                            <strong>현재 위치:</strong> {window.location.hostname}:{window.location.port}<br/>
                                            <strong>연결 상태:</strong> {getConnectionIcon()} {connectionStatus}
                                        </div>
                                    </>
                                )}

                                <div className="flex items-center gap-2">
                                    <input
                                        ref={userInputRef}
                                        type="text"
                                        placeholder="메시지를 입력하세요..."
                                        className="w-full px-3 py-2 text-sm border border-blue-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                        disabled={isStreaming}
                                    />
                                    <button
                                        className={`p-2 text-white rounded-full ${
                                            userInput.trim()
                                                ? "bg-blue-500 hover:bg-blue-600"
                                                : "bg-blue-300 cursor-not-allowed"
                                        }`}
                                        onClick={handleSend}
                                        disabled={!userInput.trim() || isStreaming}
                                    >
                                        <PaperAirplaneIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default ChatbotUI;