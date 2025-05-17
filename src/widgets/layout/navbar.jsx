import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    Navbar as MTNavbar,
    MobileNav,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { featuresDataCollege } from "@/data/features-data";

export function Navbar({ brandName, routes, action, isHovered, onHoverChange }) {
    const [openNav, setOpenNav] = React.useState(false);

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
        <ul className={`
            flex flex-col items-start mt-2 mb-2 gap-2
            lg:flex-row lg:items-center lg:mt-0 lg:mb-0 lg:gap-[15px]
            xl:gap-[30px]
            2xl:gap-[50px]
            ${isHovered ? 'text-black' : 'text-inherit'}`}>
            {routes.map(({ name, path, icon, href, target }) => {
                const collegeInfo = collegeDataMap[name];

                if (collegeInfo && collegeInfo.path === path) {
                    return (
                        <li key={name} className="relative">
                            <div className={`capitalize flex items-center gap-1 p-0.5 font lg:text-[14px] xl:text-xl tracking-wide cursor-pointer ${isHovered ? 'text-black' : 'text-white'}`}>
                                {name}
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
            className={`py-[3px] px-0 w-full shadow-none max-w-[100%] transition-colors duration-300 ease-in-out ${isHovered ? 'bg-white text-black' : 'bg-[#263238] text-white'}`}
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
        >
            <div className={`mt-[16px] sm:mt-[15px] lg:mt-[9px] md:mt-[8px] xl:mt-[7px] flex items-center px-12 pb-0 ${isHovered ? 'text-black' : 'text-white'}`}>
                <Link to="/home">
                    <img alt="Logo" src={isHovered ? "/img/usw_black.png" : "/img/usw_white.png"} className="h-[35px] transition-all duration-300 ease-in-out p-0" />
                </Link>
                <div className="hidden lg:block">{navList}</div>
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
        </MTNavbar>
    );
}

Navbar.defaultProps = {
    brandName: "USW ICT",
    action: (
        <a href="https://www.creative-tim.com/product/material-tailwind-kit-react" target="_blank" />
    ),
    isHovered: false,
    onHoverChange: () => {},
};

Navbar.propTypes = {
    brandName: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    action: PropTypes.node,
    isHovered: PropTypes.bool.isRequired,
    onHoverChange: PropTypes.func.isRequired,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
