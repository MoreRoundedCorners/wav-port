import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { FaAddressBook, FaMusic, FaTrash } from "react-icons/fa";
// import { Add } from "@material-ui/icons";
import { FaPlus } from "react-icons/fa";

export const genres = [
  { title: "Pop", value: "POP" },
  { title: "Hip-Hop", value: "HIP_HOP_RAP" },
  { title: "Dance", value: "DANCE" },
  { title: "Electronic", value: "ELECTRONIC" },
  { title: "Soul", value: "SOUL_RNB" },
  { title: "Alternative", value: "ALTERNATIVE" },
  { title: "Rock", value: "ROCK" },
  { title: "Latin", value: "LATIN" },
  { title: "Film", value: "FILM_TV" },
  { title: "Country", value: "COUNTRY" },
  { title: "Worldwide", value: "WORLDWIDE" },
  { title: "Reggae", value: "REGGAE_DANCE_HALL" },
  { title: "House", value: "HOUSE" },
  { title: "K-Pop", value: "K_POP" },
];

export const links = [
  { name: "Discover", to: "/discover", icon: HiOutlineHome },
  { name: "My Collection", to: "/myCollection", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
  { name: "Playlists", to: "/Playlists", icon: FaMusic },
  { name: "Contact", to: "/contact", icon: FaAddressBook },
];

export const buttons = [
  { name: "add", to: "/playlists", icon: FaPlus },
  { name: "trash", to: "/discover", icon: FaTrash },
];
