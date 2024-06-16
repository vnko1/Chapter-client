import { NavigationLinkProps } from "../Navigation/Navigation.type";

export type NavigationListProps = {
  classNames?: string;
  items: NavigationLinkProps[];
  isBottom?: boolean;
};
