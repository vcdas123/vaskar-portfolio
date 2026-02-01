"use client";

import { motion } from "framer-motion";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen flex flex-col bg-primary text-white"
    >
      {children}
    </motion.div>
  );
}
