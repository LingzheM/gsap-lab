import { RefObject, useCallback, useRef } from "react";

interface UseFlipOptions {
  scopeRef: RefObject<HTMLElement | null>;
  deps: unknown[];
  selector?: string;
}

export function useFlip({ scopeRef, deps, selector = '.flip-card' }: UseFlipOptions) {
  
  const stateRef = useRef<Flip.FlipState | null>(null);

  const capture = useCallback(() => {
    stateRef.current = Flip.getState(selector);
  }, [selector]);
  
  return capture;
}