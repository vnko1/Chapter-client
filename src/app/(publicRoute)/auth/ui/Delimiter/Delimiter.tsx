import { FC } from "react";

import { type DelimiterProps } from "./Delimiter.type";
import styles from "./Delimiter.module.scss";

const Delimiter: FC<DelimiterProps> = ({ text = "or", classNames }) => {
  return (
    <div className={styles["delimiter"]}>
      <p className={`${styles["delimiter__line"]} ${classNames}`}>{text}</p>
    </div>
  );
};

export default Delimiter;
