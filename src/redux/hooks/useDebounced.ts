import { useEffect, useState } from "react";

const useDebounced = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounced;
