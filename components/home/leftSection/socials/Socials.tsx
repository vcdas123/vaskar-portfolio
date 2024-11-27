import Link from 'next/link';
import React, { ReactNode } from 'react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

interface SocialDataIn {
  icon: ReactNode;
  path: string;
}
interface SocialsIn {
  containerStyles: string;
  iconStyles: string;
}

const SOCIAL_DATA: SocialDataIn[] = [
  {
    icon: <FaGithub />,
    path: 'https://github.com/vcdas123',
  },
  {
    icon: <FaLinkedin />,
    path: 'https://www.linkedin.com/in/vcdas/',
  },
  // {
  //   icon: <FaFacebook />,
  //   path: '',
  // },
];

const Socials = ({ containerStyles, iconStyles }: SocialsIn) => {
  return (
    <div className={containerStyles}>
      {SOCIAL_DATA?.map((item: SocialDataIn, idx: number) => {
        return (
          <Link key={idx} href={item?.path} className={iconStyles}>
            {item?.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
