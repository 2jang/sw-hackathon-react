import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Typography, IconButton, Tooltip } from "@material-tailwind/react";

export function TeamCard({ img, name, position, socials, detailUrl }) {
    const getTooltipContent = (iconName, path) => {
        if (iconName === "envelope" && path.startsWith("mailto:")) {
            return path.substring(7); // "mailto:" 제외
        }
        if (iconName === "phone" && path.startsWith("tel:")) {
            return path.substring(4); // "tel:" 제외
        }
        if (iconName === "location-dot") {
            return path; // path 전체를 툴팁으로 사용
        }
        return path; // 기타 아이콘은 path 그대로 사용
    };

    const cardContent = (
        <>
            <CardHeader floated={false} shadow={false} className="mx-auto h-32 w-32 rounded-full">
                <img src={img} alt={name} className="h-full w-full object-cover rounded-full" />
            </CardHeader>
            <CardBody className="px-2 py-4">
                <Typography variant="h5" color="blue-gray" className="mb-1">
                    {name}
                </Typography>
                <Typography color="blue-gray" className="font-normal text-blue-gray-500">
                    {position}
                </Typography>
            </CardBody>
            {socials && socials.length > 0 && (
                <div className="flex items-center justify-center gap-2">
                    {socials.map(({ color, name: iconName, path }) => {
                        const tooltipContent = getTooltipContent(iconName, path);
                        const isLocationDot = iconName === "location-dot";

                        const anchorProps = isLocationDot
                            ? {
                                onClick: (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                },
                                style: { cursor: "default" }
                            }
                            : {
                                href: path,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                onClick: (e) => e.stopPropagation()
                            };

                        return path ? (
                            <Tooltip
                                key={iconName}
                                content={tooltipContent}
                                placement="bottom" // 툴팁 위치를 아래쪽으로 설정
                                className="bg-white text-black border border-gray-300 shadow-md px-2 py-1 rounded-md" // 툴팁 스타일링
                            >
                                <a {...anchorProps}>
                                    <IconButton color="white" className="rounded-full shadow-none bg-transparent">
                                        <Typography color={color}>
                                            <i className={`fa-solid fa-${iconName} text-lg`} />
                                        </Typography>
                                    </IconButton>
                                </a>
                            </Tooltip>
                        ) : null;
                    })}
                </div>
            )}
        </>
    );

    if (detailUrl) {
        return (
            <a
                href={detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
            >
                <Card
                    color="transparent"
                    shadow={false}
                    className="rounded-lg text-center
                         transition-all duration-300 ease-in-out
                         hover:ring-1 hover:ring-green-500 hover:ring-opacity-50
                         hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105
                         p-6 border border-transparent hover:border-green-500/0 cursor-pointer"
                >
                    {cardContent}
                </Card>
            </a>
        );
    }

    return (
        <Card
            color="transparent"
            shadow={false}
            className="rounded-lg text-center
                 transition-all duration-300 ease-in-out
                 hover:ring-1 hover:ring-green-500 hover:ring-opacity-50
                 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105
                 p-6 border border-transparent hover:border-green-500/0"
        >
            {cardContent}
        </Card>
    );
}

TeamCard.defaultProps = {
    position: "",
    socials: [],
    detailUrl: null,
};

TeamCard.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string,
    socials: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string,
            name: PropTypes.string.isRequired,
            path: PropTypes.string,
        })
    ),
    detailUrl: PropTypes.string,
};

TeamCard.displayName = "/src/widgets/cards/team-card.jsx";

export default TeamCard;