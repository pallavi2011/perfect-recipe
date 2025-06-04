"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const PreviousPathContext = createContext("");

export function PreviousPathProvider({ children }) {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState("");
  const prevPathRef = useRef("");

  useEffect(() => {
    setPrevPath(prevPathRef.current);
    prevPathRef.current = pathname;
  }, [pathname]);

  return (
    <PreviousPathContext.Provider value={prevPath}>
      {children}
    </PreviousPathContext.Provider>
  );
}

export function usePreviousPath() {
  return useContext(PreviousPathContext);
}