"use client";
import { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useNavigation } from "@/context";
import { IconEnum, LinksEnum } from "@/types";
import { useModal } from "@/hooks";
import { Icon } from "@/components";

import { ContactUs } from "@/app/ui";

import { NavigationListProps } from "./NavigationList.type";
import styles from "./NavigationList.module.scss";

const NavigationList: FC<NavigationListProps> = ({
  items,
  classNames,
  isBottom = false,
}) => {
  const modalProps = useModal();
  const router = useRouter();
  const pathname = usePathname();

  const { setIsActiveMenu } = useNavigation();

  function handleClickNavLink() {
    setIsActiveMenu && setIsActiveMenu(false);
  }

  return (
    <>
      <ul className={cn(styles["navigation-list"], classNames)}>
        {isBottom && (
          <li
            className={`${styles["navigation-list__item"]} ${styles["contact-us"]}`}
          >
            <button
              className={`${styles["navigation-list__link"]} ${styles["navigation-list__button"]}`}
              aria-label="Open modal button"
              onClick={() => modalProps.setActive(true)}
            >
              <Icon
                icon={IconEnum.EditBook}
                className={styles["navigation-list__link-icon"]}
              />
              Contact us
            </button>
          </li>
        )}
        {items.map((navItem) => (
          <li key={navItem.id} className={styles["navigation-list__item"]}>
            <Link
              href={navItem.path}
              aria-label="Menu nav link"
              className={cn(styles["navigation-list__link"], {
                [styles["current-page"]]: navItem.path === pathname,
              })}
              onClick={handleClickNavLink}
            >
              {navItem.icon ? (
                <Icon
                  icon={navItem.icon}
                  className={styles["navigation-list__link-icon"]}
                />
              ) : null}
              {navItem.name}
            </Link>
          </li>
        ))}
        {isBottom && (
          <li className={styles["navigation-list__item"]}>
            <button
              onClick={() => router.push(LinksEnum.HOME)}
              className={`${styles["navigation-list__link"]} ${styles["navigation-list__button"]}`}
              aria-label="nav button"
            >
              <Icon
                icon={IconEnum.ArrowBack}
                className={`${styles["navigation-list__link-icon"]} ${styles["navigation-list__custom-icon"]}`}
                removeInlineStyle
              />
              Back
            </button>
          </li>
        )}
      </ul>
      <ContactUs {...modalProps} />
    </>
  );
};

export default NavigationList;
