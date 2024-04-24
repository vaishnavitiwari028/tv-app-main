import { useEffect, useRef } from "react";

const useClickOutside = (callback) => {
  const elRef = useRef();
  useEffect(() => {
    const eventListener = (e) => {
      if (elRef.current) {
        if (!elRef.current.contains(e.target)) {
          if (typeof callback === "function") callback();
        }
      }
    };
    document.addEventListener("click", eventListener);
    return () => {
      document.removeEventListener("click", eventListener);
    };
  }, []);

  return elRef;
};

export default useClickOutside;
