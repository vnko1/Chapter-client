"use client";
import React, { FC, useEffect, useState } from "react";

import { getDataFromLS } from "@/utils";

import { RecentDataProps } from "./RecentData.type";
import styles from "./RecentData.module.scss";

const RecentData: FC<RecentDataProps> = ({ query }) => {
  const [recentData, setRecentData] = useState<string[]>([]);

  useEffect(() => {
    setRecentData(getDataFromLS<string[]>("recentData") || []);
  }, [query]);
  console.log(recentData);
  return (
    <>
      <p className={styles["title"]}>Recent</p>
    </>
  );
};

export default RecentData;
