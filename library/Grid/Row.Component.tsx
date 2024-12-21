import React, { CSSProperties } from "react";
import { RowProps } from "./Grid.Component";

const Row: React.FC<RowProps> = ({
  children,
  style,
  gutter = "10px",
  ...rest
}) => {
  let colStr = "";

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      const span = child.props.span ? child.props.span : 1;
      colStr += `${span}fr `;
    }
  });

  const defaultStyle: CSSProperties = {
    display: "grid",
    width: "100%",
    gap: gutter,
    gridTemplateColumns: colStr,
  };

  return (
    <div style={{ ...defaultStyle, ...style }} {...rest}>
      {children}
    </div>
  );
};

export default Row;
