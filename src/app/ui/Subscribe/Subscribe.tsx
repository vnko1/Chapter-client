"use client";
import React, { FC, useEffect, useState } from "react";
import { SubscribeButton } from "@/components";
import { SubscribeProps } from "./Subscibe.type";
import { useProfileContext } from "@/context";

const Subscribe: FC<SubscribeProps> = ({ classNames, userId, imageUrl }) => {
  const { user } = useProfileContext();
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    const isFollow = user.subscribedTo.some((user) => user.userId === userId);
    setIsFollow(isFollow);
  }, [user.subscribedTo, userId]);

  const btnVariant = isFollow ? "outlined" : "contained";

  return (
    <SubscribeButton
      handleClick={() => {}}
      variant={btnVariant}
      className={classNames}
      aria-label="Subscribe profile button"
    >
      {isFollow ? "Unfollow" : "Follow"}
    </SubscribeButton>
  );
};

export default Subscribe;
// e78e2fac-2ab8-44d1-81a4-d84c5a12cc57
