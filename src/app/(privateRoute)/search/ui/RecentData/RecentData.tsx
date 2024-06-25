"use client";
import React, { FC, MouseEvent, useEffect, useState } from "react";

import { getDataFromLS } from "@/utils";

import { RecentDataProps } from "./RecentData.type";
import styles from "./RecentData.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const RecentData: FC<RecentDataProps> = ({ query }) => {
  const [recentData, setRecentData] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setRecentData(getDataFromLS<string[]>("recentData") || []);
  }, [query]);

  const handleRecentValueClick = (event: MouseEvent<HTMLButtonElement>) => {
    const term = event.currentTarget.value;
    const params = new URLSearchParams(searchParams);
    params.set("query", term);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <p className={styles["title"]}>Recent</p>
      <ul className={styles["list"]}>
        {recentData.map((el, i) => (
          <li key={i}>
            <button onClick={handleRecentValueClick} value={el}>
              {el}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecentData;
