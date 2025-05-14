import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";

// ICT 학부(컴퓨터학부, 정보통신학부, 데이터과학부) 카드 컴포넌트
export function FeatureCardCollege({ color, icon, title, description, links }) {
  return (
      <Card
          className="rounded-lg shadow-lg shadow-gray-500/10 flex flex-col max-w-sm mx-auto
                 transition-all duration-300 ease-in-out
                 hover:ring-1 hover:ring-green-500 hover:ring-opacity-50
                 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105"
      >
        <CardBody className="px-8 text-center flex-grow">
          <IconButton
              variant="gradient"
              size="lg"
              color={color}
              className="pointer-events-none mb-6 rounded-full"
          >
            {icon}
          </IconButton>
          <Typography variant="h5" className="mb-2" color="blue-gray">
            {title}
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            {description}
          </Typography>
        </CardBody>
        {/* "Learn More" 버튼 또는 링크 추가 */}
        {links && links.length > 0 && (
            <div className="p-6 pt-0 text-center">
              <div className="flex flex-wrap justify-center gap-2">
                {links.map((linkItem, index) => (
                    <a href={linkItem.url} target="_blank" rel="noopener noreferrer" key={index}>
                      <Button size="lg" variant="text" color="blue-gray">
                        {linkItem.text}
                      </Button>
                    </a>
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