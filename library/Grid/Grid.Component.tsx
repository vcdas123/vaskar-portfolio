import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import Col from "./Col.Component";
import Row from "./Row.Component";

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  span?: number;
}

export interface RowProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  children: React.ReactElement<ColProps, typeof Col>[];
  style?: Omit<
    CSSProperties,
    "display" | "gridTemplateColumns" | "width" | "gap"
  >;
  gutter?: string;
}

interface GridProps {
  children: React.ReactElement<RowProps, typeof Row>[];
  gutter?: string;
}

const Grid: React.FC<GridProps> & {
  Row: typeof Row;
  Col: typeof Col;
} = ({ children, gutter = "10px" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: gutter,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

Grid.Col = Col;
Grid.Row = Row;

export default Grid;
