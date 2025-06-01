import { useCallback, useEffect, useState } from "react";

export const useWindowSize = () => {
  const [dimensions, setDimensions] = useState(getDimensions());

  const onResize = useCallback(() => {
    setDimensions(getDimensions());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return dimensions;
};

export function getDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
