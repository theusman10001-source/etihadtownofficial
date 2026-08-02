"use client";

import type { ReactNode } from "react";
import { motion } from "./motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  x?: number;
  y?: number;
}

export function Reveal({ children, delay = 0, className, x = 0, y = 30 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
