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
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes, action }) {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="mb-1 mt-0.5 flex flex-col gap-0.5 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:gap-[50px]">
            {routes.map(({ name, path, icon, href, target }) => (
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
            ))}
        </ul>
    );

    const socialButtons = (
        <div className="flex items-center gap-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <IconButton className="rounded-full bg-pink-500 p-2">
                    <i className="fab fa-instagram text-lg"></i>
                </IconButton>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <IconButton className="rounded-full bg-red-600 p-2">
                    <i className="fab fa-youtube text-lg"></i>
                </IconButton>
            </a>
        </div>
    );

    return (
        <MTNavbar color="black" className="py-[3px] px-0 bg-[#263238] w-full shadow-none max-w-[98%]">
            {/* 부모 div에서 justify-between 제거 */}
            <div className="flex items-center text-white w-full px-12 pb-0">
                <div className="flex items-center gap-28 mt-2">
                    <img alt="Logo" src="../../../public/img/usw_white.png" className="h-[35px]"></img>
                    <div className="hidden lg:block">{navList}</div>
                </div>
                {/* socialButtons를 포함하는 div에 ml-auto 추가 */}
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