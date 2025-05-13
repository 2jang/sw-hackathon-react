import React, { useState, useRef, useEffect } from "react";
import {
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, XMarkIcon, CpuChipIcon } from "@heroicons/react/24/solid";

const initialMessagesForDebugging = [
    { id: 1, text: "안녕하세요! 저는 AI 챗봇입니다. 무엇을 도와드릴까요?", sender: "bot" },
    { id: 2, text: "졸업 요건에 대해 알고 싶어요.", sender: "user" },
    { id: 3, text: "네, 좋습니다! 어느 학과의 졸업 요건 정보가 필요하신가요?", sender: "bot" },
];

// 디버깅 모드 활성화 여부 (true = 활성화, false = 비활성화)
const DEBUG_MODE = false;

export function ChatbotUI() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(initialMessagesForDebugging);
    const [userInput, setUserInput] = useState("");
    const [botInput, setBotInput] = useState("");
    
    const [isDebugMode, setIsDebugMode] = useState(DEBUG_MODE);

    const messagesEndRef = useRef(null);
    const userInputRef = useRef(null);
    const botInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const toggleChatbot = () => setIsOpen(!isOpen);

    //유저 메시지 보내는 함수(함수 호출하면 보내짐)
    const handleUserSendMessage = () => {
        if (userInput.trim() === "") return;
        const newMessage = {
            id: Date.now(),
            text: userInput,
            sender: "user",
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setUserInput("");
        // 입력 후 포커스 유지
        setTimeout(() => userInputRef.current?.focus(), 0);
    };

    //봇 메시지 보내는 함수(함수 호출하면 보내짐)
    const handleBotSendMessage = () => {
        if (botInput.trim() === "") return;
        const newMessage = {
            id: Date.now() + 1,
            text: botInput,
            sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setBotInput("");
        // 입력 후 포커스 유지
        setTimeout(() => botInputRef.current?.focus(), 0);
    };

    return (
        <>
            {/* Floating Action Button */}
            {!isOpen && (
                <div
                    className="fixed bottom-6 right-6 z-[9999]"
                >
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

            {/* Chatbot Window */}
            {isOpen && (
                <div
                    className="fixed bottom-6 right-6 w-96 h-[600px] shadow-xl z-[9999] bg-white rounded-lg border border-blue-gray-50 flex flex-col overflow-hidden"
                >
                    {/* 헤더 */}
                    <div className="flex items-center justify-between p-3 bg-white border-b border-blue-gray-100 rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-blue-gray-700" />
                            <Typography variant="h6" color="blue-gray">
                                AI 챗봇
                            </Typography>
                            {/* 디버깅 모드 표시 (디버깅 모드일 때만 보임) */}
                            {isDebugMode && (
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
                                    className={`flex ${
                                        msg.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
                                            msg.sender === "user"
                                                ? "bg-amber-100 text-black rounded-br-none"
                                                : "bg-white text-black border border-blue-gray-100 rounded-bl-none"
                                        }`}
                                    >
                                        <Typography variant="small" className="break-words">
                                            {msg.text}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* 입력 영역 */}
                    <div className="px-3 py-2 border-t border-blue-gray-100">
                        {/* 봇 메시지 입력 (디버깅용): botInput안의 텍스트를 handleBotSendMessage가 처리해서 보냄*/}
                        {isDebugMode && (
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

                        {/* 사용자 메시지 입력: userInput안의 텍스트를 handleUserSendMessage간 처리해서 보냄 */}
                        <div className="flex items-center gap-2">
                            <input
                                ref={userInputRef}
                                type="text"
                                placeholder="메시지를 입력하세요..."
                                className="w-full px-3 py-2 text-sm border border-blue-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleUserSendMessage()}
                            />
                            <button
                                className={`p-2 text-white rounded-full focus:outline-none ${
                                    userInput.trim()
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-blue-300 cursor-not-allowed"
                                }`}
                                onClick={handleUserSendMessage}
                                disabled={!userInput.trim()}
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