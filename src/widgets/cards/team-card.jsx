import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Typography, IconButton } from "@material-tailwind/react";

export function TeamCard({ img, name, position, socials }) {
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
            {socials && (
                <div className="flex items-center justify-center gap-2">
                    {socials.map(({ color, name: iconName, path }) => (
                        <a href={path} target="_blank" rel="noopener noreferrer" key={iconName}>
                            <IconButton color="white" className="rounded-full shadow-none bg-transparent">
                                <Typography color={color}>
                                    {/* 'fa-brands'를 'fa-solid'로 변경 */}
                                    <i className={`fa-solid fa-${iconName} text-lg`} />
                                </Typography>
                            </IconButton>
                        </a>
                    ))}
                </div>
            )}
        </Card>
    );
}

TeamCard.defaultProps = {
    position: "",
    socials: [], // 이전 답변에서 path를 추가했으므로, 실제 데이터에는 path가 있어야 합니다.
};

TeamCard.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string,
    socials: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string,
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired, // path는 링크를 위해 여전히 필요합니다.
        })
    ),
};

TeamCard.displayName = "/src/widgets/cards/team-card.jsx";

export default TeamCard;