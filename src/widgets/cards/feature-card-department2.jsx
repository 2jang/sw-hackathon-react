import PropTypes from "prop-types";
import {
    Card,
    CardBody,
    Typography,
    IconButton,
} from "@material-tailwind/react";

// 컴퓨터학부(컴퓨터SW, 미디어SW) 카드 컴포넌트
export function FeatureCardDepartment2({ color, icon, title, description }) {
    return (
        <Card
            className="rounded-lg shadow-lg shadow-gray-500/10 flex flex-col max-w-xs mx-auto
                 ring-1 ring-gray-300 hover:ring-green-500 hover:ring-opacity-75  // 기본 테두리 및 호버 시 테두리 강조
                 transition-all duration-300 ease-in-out
                 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105 [@media(max-width:430px)]:h-[200px]" // 호버 시 그림자 및 확대 효과

        >
            <CardBody className="px-8 text-center flex-grow [@media(max-width:430px)]:p-4">
                <IconButton
                    variant="gradient"
                    size="lg"
                    color={color}
                    className="pointer-events-none [@media(max-width:430px)]:mb-2 mb-6 rounded-full"
                >
                    {icon}
                </IconButton>
                <Typography variant="h5" className="mb-2 [@media(max-width:430px)]:text-[15px]" color="blue-gray">
                    {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-600 [@media(max-width:430px)]:text-[11px]">
                    {description}
                </Typography>
            </CardBody>
        </Card>
    );
}

FeatureCardDepartment2.defaultProps = {
    color: "blue",
};

FeatureCardDepartment2.propTypes = {
    color: PropTypes.oneOf([
        "blue-gray",
        "gray",
        "brown",
        "deep-orange",
        "orange",
        "amber",
        "yellow",
        "lime",
        "light-green",
        "green",
        "teal",
        "cyan",
        "light-blue",
        "blue",
        "indigo",
        "deep-purple",
        "purple",
        "pink",
        "red",
    ]),
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
};

FeatureCardDepartment2.displayName = "/src/widgets/layout/feature-card-department2.jsx";

export default FeatureCardDepartment2;
