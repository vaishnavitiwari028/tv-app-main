import { useEffect, useState } from "react";

const useDebounce = (term, delay = 500, watchList = [term]) => {
  const [debounced, setDebounced] = useState();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(term);
    }, delay);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, watchList);
  return [debounced, setDebounced];
};

export default useDebounce;
