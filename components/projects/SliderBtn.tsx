'use client';

import { useSwiper } from 'swiper/react';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';

interface SliderBtnProps {
  containerStyles: string;
  btnStyles: string;
  iconsStyles?: string;
}

const SliderBtn: React.FC<SliderBtnProps> = ({ containerStyles, btnStyles, iconsStyles }) => {
  const swiper = useSwiper();

  return (
    <div className={containerStyles}>
      <button disabled={swiper.activeIndex === 0} className={btnStyles} onClick={() => swiper.slidePrev()}>
        <PiCaretLeftBold className={iconsStyles} />
      </button>
      <button disabled={swiper.activeIndex === 3} className={btnStyles} onClick={() => swiper.slideNext()}>
        <PiCaretRightBold className={iconsStyles} />
      </button>
    </div>
  );
};

export default SliderBtn;
