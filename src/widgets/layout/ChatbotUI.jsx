import React, { useState, useRef, useEffect } from "react";
import {
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import {
    ChatBubbleOvalLeftEllipsisIcon,
    PaperAirplaneIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";

export function ChatbotUI() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingMessage, setStreamingMessage] = useState("");
    const messagesEndRef = useRef(null);
    const userInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, streamingMessage, isOpen]);

    const toggleChatbot = () => setIsOpen(!isOpen);

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
            const res = await fetch("http://ahnai1.suwon.ac.kr:5041/route", {
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
                setStreamingMessage(result);
                scrollToBottom();
            }

            // ✅ 🎯 여기!!: 응답 스트리밍이 끝난 직후 JSON 파싱 시도
            let parsed = result;
            try {
                const json = JSON.parse(result);
                if (json.llmResponse) {
                    parsed = json.llmResponse;
                }
            } catch (e) {
                console.warn("응답 파싱 실패 → 원본 그대로 출력됨");
            }

            // ✅ 메시지 저장
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, text: parsed, sender: "bot" },
            ]);

            setStreamingMessage("");
            setIsStreaming(false);
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

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] shadow-xl z-[9999] bg-white rounded-lg border border-blue-gray-50 flex flex-col overflow-hidden">
                    {/* 헤더 */}
                    <div className="flex items-center justify-between p-3 bg-white border-b border-blue-gray-100 rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-blue-gray-700" />
                            <Typography variant="h6" color="blue-gray">
                                GPT 챗봇
                            </Typography>
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
                                    className={`flex ${
                                        msg.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
                                            msg.sender === "user"
                                                ? "bg-blue-100 text-black rounded-br-none"
                                                : "bg-white text-black border border-blue-gray-100 rounded-bl-none"
                                        }`}
                                    >
                                        <Typography variant="small" className="break-words">
                                            {msg.text}
                                        </Typography>
                                    </div>
                                </div>
                            ))}

                            {/* 스트리밍 중일 때 임시 출력 */}
                            {isStreaming && (
                                <div className="flex justify-start">
                                    <div className="max-w-[75%] p-3 rounded-xl shadow-sm bg-white text-black border border-blue-gray-100 rounded-bl-none">
                                        <Typography variant="small" className="break-words">
                                            {streamingMessage}
                                        </Typography>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* 입력 영역 */}
                    <div className="px-3 py-2 border-t border-blue-gray-100">
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
            )}
        </>
    );
}

export default ChatbotUI;
