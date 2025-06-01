import { ForwardedRef, RefCallback, RefObject } from "react";

export const mergeRefs = <T>(
  ...refs: (RefObject<T> | ForwardedRef<T> | RefCallback<T>)[]
) => {
  return (instance: T) => {
    for (const ref of refs) {
      if (ref) {
        if (typeof ref === "function") {
          ref(instance);
        } else {
          ref.current = instance;
        }
      }
    }
  };
};
