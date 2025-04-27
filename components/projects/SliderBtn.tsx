"use client";

import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { ProjectIn } from "./Projects";

interface SliderBtnProps {
  containerStyles: string;
  btnStyles: string;
  iconsStyles?: string;
  PROJECTS_DATA: ProjectIn[];
}

const SliderBtn: React.FC<SliderBtnProps> = ({
  containerStyles,
  btnStyles,
  iconsStyles,
  PROJECTS_DATA,
}) => {
  const swiper = useSwiper();

  return (
    <div className={containerStyles}>
      <button
        disabled={swiper.activeIndex === 0}
        className={btnStyles}
        onClick={() => swiper.slidePrev()}
      >
        <PiCaretLeftBold className={iconsStyles} />
      </button>
      <button
        disabled={swiper.activeIndex === PROJECTS_DATA.length - 1}
        className={btnStyles}
        onClick={() => swiper.slideNext()}
      >
        <PiCaretRightBold className={iconsStyles} />
      </button>
    </div>
  );
};

export default SliderBtn;
