import { useEffect, useRef } from 'react';

/////////make our own hook (auto scroll) to use it in different components///////
// To use a function as a hook, the function name must start with "use"

export default function useAutoScroll(dependencies: unknown[]) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerElem = containerRef.current;

    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependencies]);

  return containerRef;
}
