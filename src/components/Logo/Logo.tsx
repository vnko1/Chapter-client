import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { LinksEnum } from "@/types";

import { LogoProps } from "./Logo.type";

const Logo: FC<LogoProps> = ({ classNames, alt }) => {
  return (
    <div className={`max-w-[120px] ${classNames}`}>
      <Link href={LinksEnum.HOME} aria-label="Home page nav link">
        <Image
          width={276}
          height={74}
          src={"/svg/logo.svg"}
          alt={alt || "logo"}
          priority
        />
      </Link>
    </div>
  );
};

export default Logo;
