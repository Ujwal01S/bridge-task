import type { INaviationProps } from "@/interface";
import { Users } from "lucide-react";

export const navigationData: INaviationProps[] = [
  {
    title: "User",
    url: "#",
    icon: Users,
    subNavigation: [
      { title: "View Users", url: "/" },
      // { title: "Create User", url: "/create-user" },
    ],
  },
];
