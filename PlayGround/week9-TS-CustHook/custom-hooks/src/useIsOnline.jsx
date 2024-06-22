import { useEffect, useState } from 'react';

function useIsOnline() {
  const [isUserOnline, setIsUserOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => {
      console.log('Became online');
      setIsUserOnline(true);
    });
    window.addEventListener('offline', () => {
      console.log('Became offline');
      setIsUserOnline(false);
    });

}, []);
    return isUserOnline;
}

export default useIsOnline;
