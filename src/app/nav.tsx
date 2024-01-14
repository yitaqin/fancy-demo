'use client';

import './nav.scss';
import { useState } from 'react';

function BtnToggle({ icon }: { icon: String }) {
  return (
    <button
      type="button"
      className={`btn-toggle btn-toggle--${icon} w-7 h-7`}
    >
      {/* {[1, 2, 3].map(() => (
        <div className={`w-full h-[4px] bg-white rounded-[1px]`}></div>
      ))} */}
      <div className={`btn-toggle__bar`}></div>
      <div className={`btn-toggle__bar`}></div>
      <div className={`btn-toggle__bar`}></div>
    </button>
  );
}

function Menu() {
  return <div className="site-menu"></div>;
}

const menuItems = [
  {
    text: 'INTRODUCING FEED',
    link: '#',
  },
  {
    text: 'FEED APP',
    link: '#',
  },
  {
    text: 'MEET THE TEAM',
    link: '#',
  },
  {
    text: 'SCHEDULE A MEETING',
    link: '#',
  },
  {
    text: 'SEE THE LIVE PROTOTYPE',
    link: '#',
  },
];

export default function Nav({
  easeOut,
  navProgress = [1, 0, 0, 0], // 0 代表不显示进度条
  navActive = 0,
  onNavClick = function () {},
}: {
  easeOut?: boolean;
  navProgress?: Array<number>;
  navActive: number;
  onNavClick: (index: number) => void;
}) {
  //
  const navItems = [
    {
      text: 'INTRODUCTION',
      link: '',
    },
    {
      text: 'THE TECHNOLOGY',
      link: '',
    },
    {
      text: 'TECH SPOTLIGHT',
      link: '',
    },
    {
      text: 'WHY MUSIC?',
      link: '',
    },
  ];
  const [iconToggle, setIconToggle] = useState(['bars', 'x']);
  const [menuStates, setMenuStates] = useState(['hidden', 'visible']);

  function toggleMenu() {
    setIconToggle([...iconToggle.reverse()]);
    setMenuStates([...menuStates.reverse()]);
  }

  function genNavProgress(index: number) {
    if (navActive !== index) {
      return 'none';
    }
    if (navProgress[index] !== 0) {
      return `linear-gradient(to right, #fff 0% ${navProgress[index]}%, #b3b3b3 ${navProgress[index]}% 100%)`;
    } else {
      return `linear-gradient(to right, #fff, #fff)`;
    }
  }

  return (
    <>
      <nav
        className={`
          z-20 fixed top-0 left-0 w-full pt-8 px-8 flex justify-between overflow-hidden
          transition-[padding,margin-top]
          sm:pt-[55px] sm:px-[55px]
          ${easeOut ? 'mt-[-100%] duration-500' : 'mt-0 duration-1000'}`}
      >
        {/* Logo */}
        <div
          className={`w-7 h-7 bg-[url('/logo-white.svg')] bg-contain bg-no-repeat`}
        ></div>
        {/* Screen Nav */}
        <div
          className={`
            gap-8
            transition-[font-size]
            ${menuStates[0] === 'hidden' ? 'hidden sm:flex' : 'hidden'}
            sm:text-[12px] lg:text-[15px]`}
        >
          {navItems.map((nav, index) => (
            <div
              className={`relative cursor-pointer`}
              key={index}
              onClick={() => onNavClick(index)}
            >
              {nav.text}
              <div
                className={`transition-[opacity] duration-300 ${
                  navActive === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className={`w-full h-[5px] mt-1 `}
                  style={{
                    backgroundImage: genNavProgress(index),
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        {/* Site Menu */}
        <div
          className=""
          onClick={toggleMenu}
        >
          <BtnToggle icon={iconToggle[0]} />
        </div>
      </nav>

      {/* 全屏的菜单 */}
      <div
        className={`
          z-10 top-0 left-0 w-full h-full
          ${menuStates[0] === 'hidden' ? 'hidden' : 'fixed'}`}
      >
        <div className={`site-menu`}>
          <div
            className={`
              w-full
              text-[20px]
              md:text-[42px]`}
          >
            {menuItems.map((i) => (
              <a
                className="block w-full py-2 text-center font-bold"
                key={i.text}
                href={i.link}
              >
                {i.text}
              </a>
            ))}
          </div>
        </div>
        <div className="absolute bottom-5 w-full text-[12px] text-center">
          design by <b>Basilico</b>
          <span
            className={`inline-block w-[20px] h-[16px] bg-[url('/basilico.png')] bg-contain`}
          ></span>
        </div>
      </div>
    </>
  );
}
