'use client';

import { UIEvent, useState, useRef } from 'react';
import ScreenOne from './screen-one';
import ScreenTwo from './screen-two';
import Nav from './nav';
import './screen.scss';

export default function Home() {
  const wrapper = useRef(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [navProgress, setNavProgress] = useState([1, 0, 0, 0]);

  /* 用于事件监听防抖/节流 */
  const [timeoutId, saveTimeoutId] = useState(0);

  function switchScreen(targetScreenIndex: number) {
    if (isSwitching) return;

    // 目前只有0和1屏
    if (targetScreenIndex > 1) return;

    if (wrapper.current) {
      const target = wrapper.current as HTMLElement;
      target.style.top =
        -window.document.body.offsetHeight * targetScreenIndex * 2 + 'px';
    }

    setIsSwitching(true);
    /* 等屏幕间的过渡动画接近完成时，再去激活目标屏幕 */
    setTimeout(() => {
      setActiveScreenIndex(targetScreenIndex);
      setTimeout(() => {
        setIsSwitching(false);
      }, 500);
    }, 500);
  }

  function handleScroll(e: UIEvent) {
    if (isSwitching) return;

    if (timeoutId) clearTimeout(timeoutId);

    saveTimeoutId(
      window.setTimeout(() => {
        const t = e.target as HTMLElement;
        let targetScreenIndex: number | undefined;

        if (t.scrollTop > 32 && t.scrollTop <= 64) {
          // 滚动至底部 12px 区域内视作用户确认想要切换屏幕
          targetScreenIndex = 1;
        }

        if (t.scrollTop < 32 && t.scrollTop >= 0) {
          // 滚动至顶部 12px 区域内视作用户确认想要切换屏幕
          targetScreenIndex = 0;
        }

        if (targetScreenIndex === undefined) return;

        switchScreen(targetScreenIndex);

        /* 等屏幕切换完成(动画结束)后再重新处理滚动事件 */
      }, 5)
    );
  }

  function handleScreenOneReadingProgressChange(percent: number) {
    setNavProgress([percent || 1, 0, 0, 0]);
  }

  return (
    <div
      className="screen-container"
      onScroll={handleScroll}
    >
      {/* 顶部部缓冲安全区 */}
      {<div className="h-[32px]"></div>}
      <main>
        <div></div>
        <Nav
          easeOut={isFullScreen}
          navProgress={navProgress}
          navActive={activeScreenIndex}
          onNavClick={switchScreen}
        />
        <div
          ref={wrapper}
          className="screen-wrapper"
        >
          <ScreenOne
            onReadingProgressChange={handleScreenOneReadingProgressChange}
          />
          <div
            className={`screen-divider ${
              activeScreenIndex === 0 ? 'top-[50vh]' : 'top-[-50vh]'
            } `}
          ></div>
          <ScreenTwo
            init={activeScreenIndex === 1 ? true : false}
            onFullscreen={(fullscreen) => {
              setIsFullScreen(fullscreen);
            }}
            fullscreen={isFullScreen}
          />
        </div>
      </main>
      {/* 底部缓冲安全区 */}
      {<div className="h-[32px]"></div>}
    </div>
  );
}
