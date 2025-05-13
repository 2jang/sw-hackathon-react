import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";


function App() {
    const { pathname } = useLocation();

    return (
        <>
            {!(pathname == '/sign-in' || pathname == '/sign-up') && (
                <div className="w-full bg-[#263238] h-[64px] fixed flex items-center justify-center left-2/4 z-10 mx-auto -translate-x-2/4 p-2 top-0">
                    <div className="w-full max-w-[98%] mx-auto">
                        <Navbar routes={routes} />
                    </div>
                </div>
            )
            }
            <Routes>
                {routes.map(
                    ({ path, element }, key) =>
                        element && <Route key={key} exact path={path} element={element} />
                )}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </>
    );
}

export default App;