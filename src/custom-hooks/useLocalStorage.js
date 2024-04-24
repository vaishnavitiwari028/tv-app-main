import { useEffect, useState } from "react";

const useLocalStorage = (KEY, DATA) => {
  const [data, setData] = useState(() => {
    if (localStorage.getItem(KEY) !== null) {
      return JSON.parse(localStorage.getItem(KEY));
    }
    return DATA;
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(data));
  }, [data]);

  return [data, setData];
};

export default useLocalStorage;
