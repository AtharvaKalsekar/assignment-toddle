import { RefObject, useEffect, useState } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  onClickOutside: () => void
) => {
  const [isListenerEnabled, setIsListenerEnabled] = useState<boolean>(false);

  useEffect(() => {
    const onClick = (event: Event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        isListenerEnabled
      ) {
        onClickOutside();
        setIsListenerEnabled(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, [isListenerEnabled, onClickOutside, ref]);

  const startListening = () => {
    setIsListenerEnabled(true);
  };

  return {
    startListening,
  };
};
