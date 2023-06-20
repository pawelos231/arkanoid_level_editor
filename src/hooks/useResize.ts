import { useEffect, useState } from "react";

type ResizeCallback = () => void;

const useResize = (pixelThreshold: number, callback: ResizeCallback): void => {
  const [previousWidth, setPreviousWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = (): void => {
      const currentWidth = window.innerWidth;
      const pixelDifference = Math.abs(currentWidth - previousWidth);

      if (pixelDifference >= pixelThreshold) {
        callback();
        setPreviousWidth(currentWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pixelThreshold, callback, previousWidth]);
};

export default useResize;
