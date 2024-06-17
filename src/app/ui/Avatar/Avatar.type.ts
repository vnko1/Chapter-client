export type AvatarProps = {
  src: string;
  alt: string;
  size?: "small" | "large";
  classNames?: string;
  onClick?: () => void;
};
