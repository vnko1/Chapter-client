export type AvatarProps = {
  src: string | null;
  alt: string;
  size?: "small" | "large";
  classNames?: string;
  onClick?: () => void;
};
