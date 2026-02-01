"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StatItem {
  count: number;
  label: string;
}

interface StatsProps {
  stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
  { count: 2, label: "Years of experience" },
  { count: 7, label: "Projects completed" },
  { count: 13, label: "Technologies mastered" },
];

function AnimatedNumber({
  value,
  suffix = "",
  isHovered,
}: {
  value: number;
  suffix?: string;
  isHovered: boolean;
}) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isHovered) {
      setDisplay(0);
      return;
    }
    const duration = 600;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isHovered, value]);

  return (
    <motion.span
      animate={
        isHovered
          ? {
              scale: [1, 1.15, 0.95, 1.08, 1],
              transition: { duration: 0.5 },
            }
          : { scale: 1 }
      }
    >
      {isHovered ? display : value}
      {suffix}
    </motion.span>
  );
}

export default function Stats({ stats = DEFAULT_STATS }: StatsProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <StatCard key={item.label} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ item, index }: { item: StatItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white dark:bg-white/0 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-white/5 text-center dark:backdrop-blur cursor-pointer"
    >
      <p className="text-4xl font-bold text-accent mb-1">
        <AnimatedNumber value={item.count} suffix="+" isHovered={isHovered} />
      </p>
      <p className="text-sm text-white/70">{item.label}</p>
    </motion.div>
  );
}
