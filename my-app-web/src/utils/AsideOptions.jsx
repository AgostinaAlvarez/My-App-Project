import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { BiMessageSquareDots } from "react-icons/bi";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import UserIconAside from "../components/PrivateComponents/UserIconAside";
import { Avatar } from "antd";

export const aside_options = [
  {
    id: 1,
    name: "Home",
    route: "/",
    icon: (
      <Avatar shape="square">
        <GoHomeFill />
      </Avatar>
    ),
    selected: false,
  },
  {
    id: 2,
    name: "Busqueda",
    route: "/search",
    icon: <FaSearch />,
    selected: false,
  },
  {
    id: 3,
    name: "Mensajes",
    route: "/messages",
    icon: (
      <Avatar shape="square">
        <BiSolidMessageSquareDots />
      </Avatar>
    ),
    selected: false,
  },
  /*
  {
    id: 4,
    name: "Profile",
    route: "/profile",
    icon: <UserIconAside />,
    selected: false,
  },
  */
];
