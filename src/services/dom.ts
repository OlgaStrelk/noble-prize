import { useEffect, useCallback, MutableRefObject } from 'react';

export function useClickOutside(
  subject: Element | MutableRefObject<Element> | HTMLElement | null,
  callback: () => void
) {
  const getElement = (elementOrRef: Element | MutableRefObject<Element>) => {
    if (elementOrRef instanceof Element) {
      return elementOrRef;
    }

    return elementOrRef.current;
  };

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const element = subject && getElement(subject);

      if (element && !element.contains(event.target as Element)) {
        callback();
      }
    },
    [callback, subject]
  );

  useEffect(
    () => {
      document.addEventListener('mousedown', handleClick);

      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    },
    [subject, callback, handleClick]
  );
}