import { useEffect, useState } from 'react';

function useDebounce(inputValue, time) {
  const [debounceValue, setDeboundeValue] = useState(inputValue);

  console.log('va', inputValue);

  useEffect(() => {
    const val = setInterval(() => {
      setDeboundeValue(inputValue);
    }, time);

    return () => {
      clearInterval(val);
    };
  }, [inputValue, time]);

  return debounceValue;
}

export default useDebounce;
