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

export function Navbar({ brandName, routes, action }) {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        // 모바일 뷰 분기점을 980px로 변경
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
        <ul className="mb-1 mt-0.5 flex flex-col gap-0.5 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-[50px]">
            {routes.map(({ name, path, icon, href, target }) => {
                const collegeInfo = collegeDataMap[name];

                if (collegeInfo && collegeInfo.path === path) {
                    return (
                        <li key={name} className="relative group">
                            <div className="capitalize flex items-center gap-1 p-0.5 font text-lg tracking-wide cursor-pointer">
                                <Link
                                    to={collegeInfo.path}
                                    className="flex items-center gap-0.5 hover:text-blue-gray-300 transition-colors"
                                >
                                    {name}
                                </Link>
                                <ChevronDownIcon className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
                            </div>
                            <div
                                className="absolute left-0 top-full w-full bg-[#263238] border border-gray-700 rounded-md shadow-xl
                                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                           transform -translate-y-2 group-hover:translate-y-0
                                           transition-all duration-300 ease-in-out z-50"
                            >
                                <ul className="py-1">
                                    {collegeInfo.links.map((link) => (
                                        <li key={link.text}>
                                            <Link
                                                to={link.url}
                                                className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-150"
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
                            color="inherit"
                            className="capitalize"
                        >
                            {href ? (
                                <a
                                    href={href}
                                    target={target}
                                    className="flex items-center gap-0.5 p-0.5 font text-lg tracking-wide"
                                >
                                    {icon &&
                                        React.createElement(icon, {
                                            className: "w-[12px] h-[12px] opacity-75 mr-0.5",
                                        })}
                                    {name}
                                </a>
                            ) : (
                                <Link
                                    to={path}
                                    target={target}
                                    className="flex items-center gap-1 p-0.5 font text-lg tracking-wide"
                                >
                                    {icon &&
                                        React.createElement(icon, {
                                            className: "w-[12px] h-[12px] opacity-75 mr-0.5",
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
                <IconButton className="rounded-full bg-pink-500 p-2">
                    <i className="fab fa-instagram text-lg"></i>
                </IconButton>
            </a>
            <a href="https://www.youtube.com/@rut2025" target="_blank" rel="noopener noreferrer">
                <IconButton className="rounded-full bg-red-600 p-2">
                    <i className="fab fa-youtube text-lg"></i>
                </IconButton>
            </a>
        </div>
    );

    return (
        <MTNavbar color="black" className="py-[3px] px-0 bg-[#263238] w-full shadow-none max-w-[98%]">
            <div className="flex items-center text-white w-full px-12 pb-0">
                {/* 로고와 네비게이션 메뉴 사이의 간격 반응형 조절 */}
                <div className="flex items-center mt-2 gap-[clamp(2rem,calc(36.36vw-20.27rem),7rem)]">
                    {/* 로고 이미지를 Link 컴포넌트로 감싸서 /home으로 이동하도록 수정 */}
                    <Link to="/home">
                        <img alt="Logo" src="../../../public/img/usw_white.png" className="h-[35px]" />
                    </Link>
                    {/* lg:hidden, lg:block 등은 tailwind.config.js의 screens.lg 값에 따라 980px 기준으로 작동해야 함 */}
                    <div className="hidden lg:block">{navList}</div>
                </div>
                <div className="hidden lg:flex mt-2 ml-auto">{socialButtons}</div>
                <IconButton
                    variant="text"
                    size="sm"
                    color="white"
                    className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon strokeWidth={2} className="h-4 w-4" />
                    ) : (
                        <Bars3Icon strokeWidth={2} className="h-4 w-4" />
                    )}
                </IconButton>
            </div>
            <MobileNav
                className="rounded-xl bg-[#263238] px-1 pt-0.5 pb-1 text-white"
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
};

Navbar.propTypes = {
    brandName: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;