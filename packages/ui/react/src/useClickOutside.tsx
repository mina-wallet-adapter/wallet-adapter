import React, { type MutableRefObject, useEffect } from "react";

type useClickOutsideProps = {
  ref: MutableRefObject<Element | null>;
  callback: () => void;
};

export function useClickOutside({ ref, callback }: useClickOutsideProps) {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(e.target as Node)) callback();
    }
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [ref, callback]);
}
