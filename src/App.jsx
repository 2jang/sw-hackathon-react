import React, { useState } from "react"; // useState 임포트
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import mainRoutes from "@/mainRoutes.jsx";

function App() {
    const { pathname } = useLocation();
    const [navbarIsHovered, setNavbarIsHovered] = useState(false); // Navbar 호버 상태

    return (
        <>
            {!(pathname == '/sign-in' || pathname == '/sign-up') && (
                <div
                    className={`w-full h-[64px] fixed flex items-center justify-center left-2/4 z-10 mx-auto -translate-x-2/4 p-2 top-0 transition-colors duration-300 ease-in-out ${navbarIsHovered ? 'bg-white' : 'bg-[#263238]'}`}
                    // Navbar 호버 상태에 따라 배경색 변경
                    // onMouseEnter/Leave 핸들러는 Navbar 자체에서 관리하여 App.jsx로 상태를 전달
                >
                    <div className="w-full max-w-[98%] mx-auto">
                        <Navbar
                            routes={mainRoutes}
                            isHovered={navbarIsHovered} // 호버 상태 전달
                            onHoverChange={setNavbarIsHovered} // 호버 상태 변경 함수 전달
                        />
                    </div>
                </div>
            )}
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