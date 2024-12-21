import React from "react";
import classes from "./Img.module.css";

const Img: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  className,
  ...rest
}) => {
  return (
    <img
      {...rest}
      className={`${classes.img} h-full w-full rounded-xl ${className}`}
    />
  );
};

export default Img;
