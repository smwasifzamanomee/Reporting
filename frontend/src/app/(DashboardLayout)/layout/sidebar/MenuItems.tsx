import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Departments",
    icon: IconAperture,
    href: "/departments"
  },
  {
    id: uniqueId(),
    title: "Courses",
    icon: IconCopy,
    href: "/courses"
  },
  {
    id: uniqueId(),
    title: "Students",
    icon: IconUserPlus,
    href: "/students"
  },
  
];

export default Menuitems;
