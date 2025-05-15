import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    Navbar as MTNavbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { featuresDataCollege } from "@/data/features-data";

// isHovered와 onHoverChange props 추가
export function Navbar({ brandName, routes, action, isHovered, onHoverChange }) {
    const [openNav, setOpenNav] = React.useState(false);
    // const [isHovered, setIsHovered] = React.useState(false); // App.jsx로부터 받으므로 제거

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 980 && setOpenNav(false)
        );
    }, []);

    const collegeDataMap = React.useMemo(() => {
        return featuresDataCollege.reduce((acc, college) => {
            acc[college.title] = college;
            return acc;
        }, {});
    }, []);

    const navList = (
        <ul className={`mb-1 mt-0.5 flex flex-col gap-0.5 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-[50px] ${isHovered ? 'text-black' : 'text-inherit'}`}>
            {routes.map(({ name, path, icon, href, target }) => {
                const collegeInfo = collegeDataMap[name];

                if (collegeInfo && collegeInfo.path === path) {
                    return (
                        <li key={name} className="relative group">
                            <div className={`capitalize flex items-center gap-1 p-0.5 font text-lg tracking-wide cursor-pointer ${isHovered ? 'text-black' : 'text-white'}`}>
                                <Link
                                    to={collegeInfo.path}
                                    className={`flex items-center gap-0.5 transition-colors ${isHovered ? 'hover:text-gray-600' : 'hover:text-blue-gray-300'}`}
                                >
                                    {name}
                                </Link>
                                <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform duration-200 group-hover:rotate-180 ${isHovered ? 'text-black' : 'text-white'}`} />
                            </div>
                            <div
                                className={`absolute left-0 top-full w-full border rounded-md shadow-xl
                                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                           transform -translate-y-2 group-hover:translate-y-0
                                           transition-all duration-300 ease-in-out z-50 
                                           ${isHovered ? 'bg-white border-gray-300' : 'bg-[#263238] border-gray-700'}`}
                            >
                                <ul className="py-1">
                                    {collegeInfo.links.map((link) => (
                                        <li key={link.text}>
                                            <Link
                                                to={link.url}
                                                className={`block px-4 py-2 text-sm transition-colors duration-150 ${isHovered ? 'text-black hover:bg-gray-200' : 'text-white hover:bg-gray-700'}`}
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    );
                } else {
                    return (
                        <Typography
                            key={name}
                            as="li"
                            variant="small"
                            className={`capitalize ${isHovered ? 'text-black' : 'text-inherit'}`}
                        >
                            {href ? (
                                <a
                                    href={href}
                                    target={target}
                                    className={`flex items-center gap-0.5 p-0.5 font text-lg tracking-wide transition-colors ${isHovered ? 'hover:text-gray-600' : 'text-white hover:text-blue-gray-300'}`}
                                >
                                    {icon &&
                                        React.createElement(icon, {
                                            className: `w-[12px] h-[12px] opacity-75 mr-0.5 ${isHovered ? 'text-black' : ''}`,
                                        })}
                                    {name}
                                </a>
                            ) : (
                                <Link
                                    to={path}
                                    target={target}
                                    className={`flex items-center gap-1 p-0.5 font text-lg tracking-wide transition-colors ${isHovered ? 'hover:text-gray-600' : 'text-white hover:text-blue-gray-300'}`}
                                >
                                    {icon &&
                                        React.createElement(icon, {
                                            className: `w-[12px] h-[12px] opacity-75 mr-0.5 ${isHovered ? 'text-black' : ''}`,
                                        })}
                                    {name}
                                </Link>
                            )}
                        </Typography>
                    );
                }
            })}
        </ul>
    );

    const socialButtons = (
        <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/usw_rut_22nd/" target="_blank" rel="noopener noreferrer">
                <IconButton variant="text" color={isHovered ? "black" : "white"} className="rounded-full transition-colors">
                    <i className="fab fa-instagram text-xl"></i>
                </IconButton>
            </a>
            <a href="https://www.youtube.com/@rut2025" target="_blank" rel="noopener noreferrer">
                <IconButton variant="text" color={isHovered ? "black" : "white"} className="rounded-full transition-colors">
                    <i className="fab fa-youtube text-xl"></i>
                </IconButton>
            </a>
        </div>
    );

    return (
        <MTNavbar
            color="transparent"
            className={`py-[3px] px-0 w-full shadow-none max-w-[98%] transition-colors duration-300 ease-in-out ${isHovered ? 'bg-white text-black' : 'bg-[#263238] text-white'}`}
            onMouseEnter={() => onHoverChange(true)} // App.jsx의 상태 변경 함수 호출
            onMouseLeave={() => onHoverChange(false)} // App.jsx의 상태 변경 함수 호출
        >
            <div className={`flex items-center w-full px-12 pb-0 ${isHovered ? 'text-black' : 'text-white'}`}>
                <div className="flex items-center mt-2 gap-[clamp(2rem,calc(36.36vw-20.27rem),7rem)]">
                    <Link to="/home">
                        <img alt="Logo" src={isHovered ? "/img/usw_black.png" : "/img/usw_white.png"} className="h-[35px] transition-all duration-300 ease-in-out" />
                    </Link>
                    <div className="hidden lg:block">{navList}</div>
                </div>
                <div className="hidden lg:flex mt-2 ml-auto">{socialButtons}</div>
                <IconButton
                    variant="text"
                    size="sm"
                    color={isHovered ? "black" : "white"}
                    className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden transition-colors"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon strokeWidth={2} className={`h-4 w-4 ${isHovered ? 'text-black' : 'text-white'}`} />
                    ) : (
                        <Bars3Icon strokeWidth={2} className={`h-4 w-4 ${isHovered ? 'text-black' : 'text-white'}`} />
                    )}
                </IconButton>
            </div>
            <MobileNav
                className={`rounded-xl px-1 pt-0.5 pb-1 transition-colors duration-300 ease-in-out ${isHovered ? 'bg-white text-black' : 'bg-[#263238] text-white'}`}
                open={openNav}
            >
                <div className="container mx-auto">
                    {navList}
                    <div className="mt-4 flex justify-center">
                        {socialButtons}
                    </div>
                    <a
                        href="https://www.material-tailwind.com/blocks/react?ref=mtkr"
                        target="_blank"
                        className="mb-1 block"
                    >
                    </a>
                    {React.cloneElement(action, {
                        className: "w-full block",
                    })}
                </div>
            </MobileNav>
        </MTNavbar>
    );
}

Navbar.defaultProps = {
    brandName: "USW ICT",
    action: (
        <a
            href="https://www.creative-tim.com/product/material-tailwind-kit-react"
            target="_blank"
        >
        </a>
    ),
    // isHovered와 onHoverChange의 기본값 설정 (필수는 아님)
    isHovered: false,
    onHoverChange: () => {},
};

Navbar.propTypes = {
    brandName: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    action: PropTypes.node,
    isHovered: PropTypes.bool.isRequired, // prop 타입 정의
    onHoverChange: PropTypes.func.isRequired, // prop 타입 정의
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;