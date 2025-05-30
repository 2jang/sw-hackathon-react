import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import {Link} from "react-router-dom";

// ICT 학부(컴퓨터학부, 정보통신학부, 데이터과학부) 카드 컴포넌트
export function FeatureCardCollege({ color, icon, title, description, links }) {
  return (
      <Card
          className="rounded-lg shadow-lg shadow-gray-500/10 flex flex-col max-w-xs mx-auto
                 ring-1 ring-gray-300 hover:border-[#1e293b]-500 hover:ring-opacity-75  // 기본 테두리 및 호버 시 테두리 강조
                 transition-all duration-300 ease-in-out
                 hover:shadow-2xl hover:shadow-[#1e293b]-900 hover:scale-105 [@media(max-width:430px)]:h-[200px]" // 호버 시 그림자 및 확대 효과

      >
        <CardBody className="px-8 text-center flex-grow [@media(max-width:430px)]:p-4">
          <IconButton
              variant="gradient"
              size="lg"
              color={color}
              className="pointer-events-none [@media(max-width:430px)]:mb-2 mb-6 rounded-full [@media(max-width:430px)]:w-[30px] [@media(max-width:430px)]:h-[30px]"
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
        {/* "Learn More" 버튼 또는 링크 추가 */}
        {links && links.length > 0 && (
            <div className="p-6 pt-0 text-center">
              <div className="flex flex-wrap justify-center gap-2">
                {links.map((linkItem, index) => (
                    <Link to={linkItem.url}>
                      <Button size="lg" variant="text" color="blue-gray" className="[@media(max-width:430px)]:text-[10px] [@media(max-width:430px)]:p-1">
                        {linkItem.text}
                      </Button>
                    </Link>
                ))}
              </div>
            </div>
        )}
      </Card>
  );
}

FeatureCardCollege.defaultProps = {
  color: "blue",
  links: [],
};

FeatureCardCollege.propTypes = {
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
  links: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
  ),
};

FeatureCardCollege.displayName = "/src/widgets/layout/feature-card-college.jsx";

export default FeatureCardCollege;