import { FC } from "react";
import Link from "next/link";

import { LinksEnum } from "@/types";

import { BlockAuthProps } from "./BlockAuth.type";
import styles from "./BlockAuth.module.scss";

const BlockAuth: FC<BlockAuthProps> = ({
  className,
  heading,
  showBottomText = false,
  typePageText,
  children,
}) => {
  return (
    <section className={`${styles["block-auth"]} ${className}`}>
      <div className={styles["block-auth__container"]}>
        <div className={styles["block-auth__body"]}>
          {heading && (
            <h1 className={styles["block-auth__heading"]}>{heading}</h1>
          )}
          {children}
        </div>
        {showBottomText ? (
          <div className={styles["block-auth__bottom-text"]}>
            <p>
              By clicking {typePageText ? `"${typePageText}"` : null} above, you
              acknowledged that you have read and understood, and agree to
              Chapter&apos;s {""}
              <Link
                href={LinksEnum.TERMS + "/1"}
                aria-label="Terms and conditions link"
              >
                Terms & Conditions and Privacy Policy.
              </Link>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default BlockAuth;
