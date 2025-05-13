import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import mainRoutes from "@/mainRoutes.jsx";


function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!(pathname == '/sign-in' || pathname == '/sign-up') && (
        <div className="w-full bg-[#0f172a] h-[128px] fixed flex items-center justify-center left-2/4 z-10 mx-auto -translate-x-2/4 p-4 top-0">
          <Navbar routes={mainRoutes} />
        </div>
      )
      }
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
