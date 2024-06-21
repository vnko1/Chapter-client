import { FC } from "react";
import cn from "classnames";

import { LayoutProps } from "./Layout.type";
import styles from "./Layout.module.scss";

const Layout: FC<LayoutProps> = ({
  children,
  title,
  fullWidth = false,
  classNames,
  customSpacing = false,
}) => {
  const containerClassNames = cn(
    styles["layout"],
    {
      [styles["layout__width--full"]]: fullWidth,
      [styles["layout__width"]]: !fullWidth,
      [styles["layout__base"]]: !customSpacing,
      [styles["layout__story"]]: customSpacing,
    },
    classNames
  );
  return (
    <div className={containerClassNames}>
      {title ? <h3 className={styles["layout__title"]}>{title}</h3> : null}
      {children}
    </div>
  );
};

export default Layout;
