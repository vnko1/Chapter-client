import { LinksEnum } from "@/types";
import { NavigationLinkProps } from "./Navigation.type";

export const navigation: NavigationLinkProps[] = [
  {
    id: "1",
    path: LinksEnum.TERMS + "/1",
    name: "1. Introduction",
  },
  {
    id: "2",
    path: LinksEnum.TERMS + "/2",
    name: "2. Acceptance of Terms",
  },
  {
    id: "3",
    path: LinksEnum.TERMS + "/3",
    name: "3. User Accounts",
  },
  {
    id: "4",
    path: LinksEnum.TERMS + "/4",
    name: "4. User Conduct",
  },
  {
    id: "5",
    path: LinksEnum.TERMS + "/5",
    name: "5. Content Ownership and Use",
  },
  {
    id: "6",
    path: LinksEnum.TERMS + "/6",
    name: "6. Privacy",
  },
  {
    id: "7",
    path: LinksEnum.TERMS + "/7",
    name: "7. Termination",
  },
  {
    id: "8",
    path: LinksEnum.TERMS + "/8",
    name: "8. Disclaimer of Warranties",
  },
  {
    id: "9",
    path: LinksEnum.TERMS + "/9",
    name: "9. Limitation of Liability",
  },
  {
    id: "10",
    path: LinksEnum.TERMS + "/10",
    name: "10. Changes to Terms",
  },
  {
    id: "11",
    path: LinksEnum.TERMS + "/11",
    name: "11. Contact Information",
  },
];

export const bottomNavigation: NavigationLinkProps[] = [];
