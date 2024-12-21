import { ColProps } from "./Grid.Component";

const Col: React.FC<ColProps> = ({ children, span = 1, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

export default Col;
