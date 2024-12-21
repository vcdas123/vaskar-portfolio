import React, { useState } from "react";
import styles from "./Spoiler.module.css";

interface SpoilerProps {
  maxHeight: number;
  showLabel?: string;
  hideLabel?: string;
  children: React.ReactNode;
}

const Spoiler: React.FC<SpoilerProps> = ({
  maxHeight,
  showLabel = "show more",
  hideLabel = "hide",
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div
        className={styles.spoilerContent}
        style={{
          height: isExpanded ? "auto" : `${maxHeight}px`,
        }}
      >
        {children}
      </div>
      <p
        onClick={() => setIsExpanded(prev => !prev)}
        className={styles.spoilerButton}
      >
        {isExpanded ? hideLabel : showLabel}
      </p>
    </div>
  );
};

export default Spoiler;
