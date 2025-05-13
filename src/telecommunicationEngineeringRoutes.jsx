import {ICT, CIS} from "@/pages";

export const telecommunicationEngineeringRoutes = [
    {
        name: "정보통신학과",
        path: "/telecommunicationEngineering/ICT",
        element: <ICT />,
    },
    {
        name: "정보보호학과",
        path: "/telecommunicationEngineering/CIS",
        element: <CIS />,
    },
];

export default telecommunicationEngineeringRoutes;