import { FC } from "react";
import cn from "classnames";

import { Icon, Modal } from "@/components";

import styles from "./ContactUs.module.scss";
import { ContactUsProps } from "./ContactUs.type";
import { IconEnum, OuterLinksEnum } from "@/types";

const ContactUs: FC<ContactUsProps> = ({
  title = "Select a social network to contact us",
  ...props
}) => {
  const menuClassNames = cn(styles["menu"], {
    [styles["active"]]: props.visible,
  });

  return (
    <Modal classNames={styles["backdrop"]} {...props}>
      <div className={menuClassNames}>
        <button className={styles["close-btn"]} onClick={() => props.close()}>
          <Icon size={32} icon={IconEnum.Cross} />
        </button>
        <h2 className={styles["title"]}>{title}</h2>
        <ul className={styles["links"]}>
          <li className={styles["links__item"]}>
            <a
              href={OuterLinksEnum.TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["links"]}
            >
              <Icon
                size={40}
                className={styles["link__icon"]}
                icon={IconEnum.TelegramLink}
              />
            </a>
          </li>
          <li className={styles["links__item"]}>
            <a
              href={OuterLinksEnum.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["links"]}
            >
              <Icon
                size={40}
                className={styles["link__icon"]}
                icon={IconEnum.LinkedinLink}
              />
            </a>
          </li>
          <li className={styles["links__item"]}>
            <a
              href={OuterLinksEnum.GMAIL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["links"]}
            >
              <Icon
                size={40}
                className={styles["link__icon"]}
                icon={IconEnum.GoogleLink}
              />
            </a>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default ContactUs;
