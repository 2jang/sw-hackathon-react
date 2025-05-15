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
            {/* 모바일: h-24 w-24, md 이상: h-32 w-32 */}
            <CardHeader floated={false} shadow={false} className="mx-auto h-24 w-24 md:h-32 md:w-32 rounded-full">
                <img src={img} alt={name} className="h-full w-full object-cover rounded-full" />
            </CardHeader>
            <CardBody className="px-2 py-4">
                <Typography variant="h5" color="blue-gray" className="mb-1 text-base md:text-lg"> {/* 텍스트 크기 반응형 조정 */}
                    {name}
                </Typography>
                <Typography color="blue-gray" className="font-normal text-blue-gray-500 text-sm md:text-base"> {/* 텍스트 크기 반응형 조정 */}
                    {position}
                </Typography>
            </CardBody>
            {socials && socials.length > 0 && (
                <div className="flex items-center justify-center gap-1 md:gap-2"> {/* 아이콘 간격 반응형 조정 */}
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
                                placement="bottom"
                                className="bg-white text-black border border-gray-300 shadow-md px-2 py-1 rounded-md text-xs" // 툴팁 텍스트 크기 조정
                            >
                                <a {...anchorProps}>
                                    {/* 아이콘 크기 반응형 조정 */}
                                    <IconButton color="white" className="rounded-full shadow-none bg-transparent p-1 md:p-2">
                                        <Typography color={color}>
                                            <i className={`fa-solid fa-${iconName} text-base md:text-lg`} />
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

    // 카드 전체에 대한 스타일링 (카드 최대 너비 제한 및 가운데 정렬)
    const cardClassName = `rounded-lg text-center
                         transition-all duration-300 ease-in-out
                         hover:ring-1 hover:ring-green-500 hover:ring-opacity-50
                         hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105
                         p-4 md:p-6 border border-transparent hover:border-green-500/0 mx-auto max-w-[280px] sm:max-w-xs`; // 패딩 및 최대 너비 조정, mx-auto 추가

    if (detailUrl) {
        return (
            <a
                href={detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline block" // block으로 변경하여 카드 너비가 적용되도록 함
            >
                <Card
                    color="transparent"
                    shadow={false}
                    className={`${cardClassName} cursor-pointer`}
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
            className={cardClassName}
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