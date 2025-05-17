import React, { useState, useEffect, useRef } from "react";
import {Routes, Route, Navigate, useLocation, Link} from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import mainRoutes from "@/mainRoutes.jsx";
import ScrollToTop from "@/widgets/layout/ScrollTpTop.jsx";

function App() {
    const { pathname } = useLocation();
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsBoxVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function toggleBoxVisible() {
        setIsBoxVisible(prev => !prev);
    }

    return (
        <>
            {!(pathname === '/sign-in' || pathname === '/sign-up') && (
                <div
                    ref={containerRef}
                    className={`w-full h-[70px] fixed flex items-center justify-center left-2/4 z-10 mx-auto -translate-x-2/4 p-2 top-0 transition-colors duration-300 ease-in-out ${
                        isBoxVisible ? 'bg-white' : 'bg-[#263238]'
                    }`}
                >
                    <div className="relative w-full max-w-[100%] mx-auto z-20">
                        {/* 네비게이션 바 클릭 시 토글 */}
                        <div
                            className="w-full h-[70px]"
                            onClick={toggleBoxVisible}
                            style={{ cursor: "pointer" }}
                        >
                            <Navbar
                                routes={mainRoutes}
                                isHovered={isBoxVisible}
                            />
                        </div>

                        {/* 아래로 나오는 박스 */}
                        <div
                            className={`absolute top-[70px] bg-white shadow-md transition-opacity duration-300 ease-in-out z-10
                                ${isBoxVisible
                                ? "opacity-100 visible h-[400px] w-[95vw] md:max-w-[900px] lg:w-[900px] lg:ml-[170px] mt-[8px]"
                                : "opacity-0 invisible h-0"
                            }`}
                        >
                            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-3 gap-8 text-gray-900">

                                {/* Column 1: 컴퓨터 계열 */}
                                <div>
                                    <p className="text-sm mb-3 font-medium text-gray-500">컴퓨터학부</p>

                                    <Link
                                        to="/computer_sw"
                                        onClick={toggleBoxVisible}
                                    >
                                        <p className="text-lg font-bold text-black hover:text-[#febe3a] transition-colors duration-300">컴퓨터SW</p>
                                        <p className="text-sm text-gray-500 mb-6">소프트웨어 중심대학 핵심 학과</p>
                                    </Link>

                                    <Link
                                        to="/media_sw"
                                        onClick={toggleBoxVisible}
                                    >
                                        <p className="text-lg font-bold text-black hover:text-[#febe3a] transition-colors duration-300">미디어SW</p>
                                        <p className="text-sm text-gray-500">게임, 콘텐츠 중심 융합 소프트웨어 학과</p>
                                    </Link>
                                </div>

                                {/* Column 2: 정보통신 계열 */}
                                <div className="border-l pl-6">
                                    <p className="text-sm mb-3 font-medium text-gray-500">정보통신학부</p>

                                    <Link
                                        to="/ict"
                                        onClick={toggleBoxVisible}
                                    >
                                        <p className="text-lg font-bold text-black hover:text-[#febe3a] transition-colors duration-300">정보통신학과</p>
                                        <p className="text-sm text-gray-500 mb-6">차세대 통신 기술 기반 응용 전문가 양성</p>
                                    </Link>

                                    <Link
                                        to="/cis"
                                        onClick={toggleBoxVisible}
                                    >
                                        <p className="text-lg font-bold text-black hover:text-[#febe3a] transition-colors duration-300">정보보호학과</p>
                                        <p className="text-sm text-gray-500">정보 보안 및 해킹 대응 전문가 양성</p>
                                    </Link>
                                </div>

                                {/* Column 3: 데이터과학과 */}
                                <div className="border-l pl-6">
                                    <p className="text-sm mb-3 font-medium text-gray-500">데이터학부</p>

                                    <Link
                                        to="/data_science"
                                        onClick={toggleBoxVisible}
                                    >
                                        <p className="text-lg font-bold text-black hover:text-[#febe3a] transition-colors duration-300">데이터과학과</p>
                                        <p className="text-sm text-gray-500">AI와 빅데이터 기반 데이터 전문가 양성</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ScrollToTop /> {/* 페이지 변경 시 스크롤 상단으로 이동 */}
            <Routes>
                {mainRoutes.map(
                    ({ path, element }, key) =>
                        element && <Route key={key} exact path={path} element={element} />
                )}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </>
    );
}

export default App;
