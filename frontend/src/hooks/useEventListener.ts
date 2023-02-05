import { useEffect } from "react";

export default function useEventListener(
  type: string,
  callback: (...args: any) => void
) {
  useEffect(() => {
    document.addEventListener(type, callback);
    return () => {
      document.removeEventListener(type, callback);
    };
  }, [type, callback]);
}
