"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "../app.module.css";

export type CursorType = "default" | "hover" | "image" | "link";

type CursorCtx = {
  cursor: CursorType;
  setCursor: (c: CursorType) => void;
};

const CursorContext = createContext<CursorCtx>({
  cursor: "default",
  setCursor: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursor, setCursor] = useState<CursorType>("default");
  return (
    <CursorContext.Provider value={{ cursor, setCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}

const LABELS: Record<CursorType, string> = {
  default: "",
  hover: "OPEN",
  image: "VIEW",
  link: "↗",
};

export function Cursor() {
  const { cursor } = useCursor();
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [visible, mouseX, mouseY]);

  if (isTouch) return null;

  const isActive = cursor !== "default";

  return (
    <>
      <motion.div
        className={styles.cursorDot}
        style={{
          x: mouseX,
          y: mouseY,
          opacity: visible ? 1 : 0,
          scale: isActive ? 0 : 1,
        }}
        transition={{ scale: { duration: 0.15 } }}
      />
      <motion.div
        className={`${styles.cursorRing} ${isActive ? styles.cursorRingActive : ""}`}
        style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      >
        {isActive && (
          <motion.span
            className={styles.cursorLabel}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1 }}
          >
            {LABELS[cursor]}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
