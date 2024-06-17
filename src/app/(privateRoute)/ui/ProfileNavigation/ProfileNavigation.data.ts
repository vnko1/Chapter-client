import { IconEnum, LinksEnum } from "@/types";
import { NavigationLinkProps } from "./ProfileNavigation.type";

export const navigation: NavigationLinkProps[] = [
  {
    id: "1",
    path: LinksEnum.DASHBOARD,
    icon: IconEnum.Home,
    name: "Feed",
  },
  {
    id: "2",
    path: LinksEnum.NOTIFICATION,
    icon: IconEnum.Notification,
    name: "Notification",
  },
  {
    id: "3",
    path: LinksEnum.SEARCH,
    icon: IconEnum.Search,
    name: "Search",
  },
  {
    id: "4",
    path: LinksEnum.PROFILE,
    icon: IconEnum.User,
    name: "Profile",
  },
  {
    id: "5",
    path: LinksEnum.USER_BOOKS,
    icon: IconEnum.Nav_book,
    name: "My library",
  },
];

export const bottomNavigation: NavigationLinkProps[] = [
  {
    id: "5",
    path: LinksEnum.SETTINGS,
    icon: IconEnum.Settings,
    name: "Settings",
  },
];
