"use client";
import { SubscribeButton } from "@/components";
import React, { FC } from "react";
import { SubscribeProps } from "./Subscibe.type";

const Subscribe: FC<SubscribeProps> = ({ classNames }) => {
  return (
    <SubscribeButton
      onHandleClick={onHandleClick}
      variant={btnVariant}
      className={classNames}
      aria-label="Subscribe profile button"
    >
      {isFollow ? "Unfollow" : "Follow"}
    </SubscribeButton>
  );
};

export default Subscribe;
