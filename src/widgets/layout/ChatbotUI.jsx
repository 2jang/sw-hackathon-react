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

export function ChatbotUI() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(initialMessagesForDebugging);
    //const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [botInput, setBotInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingMessage, setStreamingMessage] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const messagesEndRef = useRef(null);
    const userInputRef = useRef(null);
    const botInputRef = useRef(null);

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
        setUserInput("");
        setStreamingMessage("");
        setIsStreaming(true);

        try {
            const res = await fetch("http://ahnai1.suwon.ac.kr:5041/route/stream", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userInput }),
            });

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
                console.warn("⚠️ 응답 파싱 실패 → 원본 그대로 출력");
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
        } catch (err) {
            console.error("Streaming error:", err);
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 2, text: "⚠️ 오류가 발생했습니다.", sender: "bot" },
            ]);
        } finally {
            setIsStreaming(false);
        }
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
                        <div className={`fixed bottom-6 right-6 ${containerWidth} [@media(max-width:430px)]:w-[340px] ${containerHeight} shadow-xl z-[9999] bg-white rounded-2xl border border-blue-gray-50 flex flex-col overflow-hidden`}>
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
