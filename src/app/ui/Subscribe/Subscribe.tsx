"use client";
import React, { FC, useEffect, useState } from "react";
import { SubscribeButton } from "@/components";
import { useProfileContext } from "@/context";
import { subscribeToggler } from "@/lib/actions";
import { CustomError } from "@/services";

import { SubscribeProps } from "./Subscribe.type";

const Subscribe: FC<SubscribeProps> = ({ classNames, userId }) => {
  const { user, setUser } = useProfileContext();
  const [isFollow, setIsFollow] = useState(false);

  const onClick = async () => {
    try {
      const res = await subscribeToggler(userId);
      if (res?.isError) throw new CustomError(res.error);
      setUser({ ...user, subscribedTo: res.data });
    } catch (error) {
      if (error instanceof CustomError) {
        console.log("🚀 ~ onClick ~ error:", error);
      }
    }
  };

  useEffect(() => {
    const isFollow = user.subscribedTo.some((user) => user.userId === userId);
    setIsFollow(isFollow);
  }, [user.subscribedTo, userId]);

  const btnVariant = isFollow ? "outlined" : "contained";

  return (
    <SubscribeButton
      handleClick={onClick}
      variant={btnVariant}
      classNames={classNames}
      aria-label="Subscribe profile button"
    >
      {isFollow ? "Unfollow" : "Follow"}
    </SubscribeButton>
  );
};

export default Subscribe;
