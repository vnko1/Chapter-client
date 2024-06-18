"use client";
import { useEffect, useState } from "react";

import { useGetScreenSize } from "@/hooks";

import { UseSwipeProps } from "./useSwipe.type";

export const useSwipe = ({
  lSwipe,
  rSwipe,
  nodeRef,
  enableSwipe = false,
  axis = "clientX",
  touchDistinction = 200,
  screenDimension = 769,
}: UseSwipeProps) => {
  const [touchStart, setTouchStart] = useState(0);

  const [screenSize] = useGetScreenSize();

  useEffect(() => {
    const element = nodeRef?.current;
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.changedTouches[0][axis]);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0][axis];

      if (touchStart - touchEnd > touchDistinction) {
        lSwipe && lSwipe();
      }

      if (touchStart - touchEnd < -touchDistinction) {
        rSwipe && rSwipe();
      }
    };

    if (enableSwipe && screenSize < screenDimension) {
      if (nodeRef) {
        element?.addEventListener("touchstart", handleTouchStart);
        element?.addEventListener("touchend", handleTouchEnd);
      } else {
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchend", handleTouchEnd);
      }
    }

    return () => {
      if (nodeRef) {
        element?.removeEventListener("touchstart", handleTouchStart);
        element?.removeEventListener("touchend", handleTouchEnd);
      } else {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [
    axis,
    enableSwipe,
    screenDimension,
    nodeRef,
    screenSize,
    touchDistinction,
    touchStart,
    rSwipe,
    lSwipe,
  ]);
};
