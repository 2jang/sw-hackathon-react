import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  return (
    <footer className="relative px-4 pt-8 pb-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <Typography variant="h4" className="mb-4 [@media(max-width:430px)]:text-[16px]" color="blue-gray">
              {title}
            </Typography>
            <Typography className="font-normal text-blue-gray-500 lg:w-2/5 [@media(max-width:430px)]:text-[12px]">
              {description}
            </Typography>
            <div className="mx-auto mt-6 mb-8 flex justify-center gap-2 md:mb-0 lg:justify-start">
              {socials.map(({ color, name, path }) => (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton color="white" className="rounded-full shadow-none bg-transparent">
                    <Typography color={color}>
                      <i className={`fa-brands fa-${name}`} />
                    </Typography>
                  </IconButton>
                </a>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
            {menus.map(({ name, items }) => (
              <div key={name}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-medium uppercase [@media(max-width:430px)]:text-[10px]"
                >
                  {name}
                </Typography>
                <ul className="mt-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        variant="small"
                        className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700 [@media(max-width:430px)]:text-[8px]"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500 [@media(max-width:430px)]:text-[8px]"
            >
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "지능형SW융합대학",
  description:
    "COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE",
  socials: [
    {
      color: "gray",
      name: "figma",
      path: "https://www.figma.com/design/3YCKKNRUibX3zevfhov3wN/ICT%ED%95%B4%EC%BB%A4%ED%86%A4?node-id=0-1&t=dse7JdGJIDWxCbXu-1",
    },
    {
      color: "gray",
      name: "youtube",
      path: "https://www.youtube.com/@usw",
    },
    {
      color: "gray",
      name: "instagram",
      path: "https://www.instagram.com/usw1982/",
    },
    {
      color: "black",
      name: "github",
      path: "https://github.com/2025-sw-hackathon",
    },
  ],
  menus: [
    {
      name: "useful links",
      items: [
        { name: "대학정보공시", path: "https://www.academyinfo.go.kr/popup/pubinfo1690/list.do?schlId=0000140" },
        { name: "개인정보처리방침", path: "https://www.suwon.ac.kr/index.html?menuno=1955" },
        {
          name: "개인정보제공공시",
          path: "https://www.suwon.ac.kr/index.html?menuno=1928",
        },
        {
          name: "이메일무단수집거부",
          path: "https://www.suwon.ac.kr/index.html?menuno=1963",
        },
        {
          name: "정보보호",
          path: "https://www.suwon.ac.kr/index.html?menuno=1964",
        },
      ],
    },
    {
      name: "other resources",
      items: [
        {
          name: "대학 입학",
          path: "https://ipsi.suwon.ac.kr/",
        },
        {
          name: "대학원 입학",
          path: "https://www.suwon.ac.kr/index.html?menuno=782",
        },
        {
          name: "전화번호",
          path: "https://www.suwon.ac.kr/index.html?menuno=653",
        },
        {
          name: "찾아오시는 길",
          path: "https://www.suwon.ac.kr/index.html?menuno=654",
        },
        {
          name: "대중교통 안내",
          path: "https://www.suwon.ac.kr/index.html?menuno=656",
        },
      ],
    },
  ],
  copyright: (
    <>
      Copyright © {year} USW Hackathon by{" "}
      <a
        href="https://github.com/2025-sw-hackathon"
        target="_blank"
        className="text-blue-gray-500 transition-colors hover:text-blue-500"
      >
        1조 SuwonAI
      </a>
      .
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
