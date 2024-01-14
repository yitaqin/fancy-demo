'use client';

import { useState, useRef, UIEvent, WheelEvent } from 'react';
import './screen-one.scss';

export default function ScreenOne({
  onReadingProgressChange = function () {},
}: {
  onReadingProgressChange?: (percent: number) => void;
}) {
  const sentenceContainer = useRef(null);
  const [isReachTop, setReachTop] = useState(true);
  const [wheelDeltaY, setWheelDeltaY] = useState(0);
  const [firstSentencePos, setFirstSentencePos] = useState(0);
  const maxRow = 7;
  const opacityMap = [0.1, 0.3, 0.9, 1, 0.75, 0.5, 0.1];
  const scaleMap = [1.75, 1.5, 1.25, 1, 0.75, 0.5, 0.25];

  /* 用于事件监听防抖/节流 */
  const [timeoutId, saveTimeoutId] = useState(0);
  const sentences = [
    '',
    '',
    '',
    'When you want something,',
    'all the universe conspires',
    'in helping you to achieve it.',
    <b key="Paulo Coelho">
      <i>Paulo Coelho</i>
    </b>,
    '',
    'Feed is that conspiracy:',
    'the conspiracy of trust.',
    '',
    'Trust is the single',
    'most important ingredient',
    'missing from digital relationships.',
    '',
    '',
    '',
    <p key="Feed is a digital mechanism of trust">
      Feed is a digital mechanism of&nbsp;<b>trust</b>
    </p>,
    '',
    '',
    '',
  ];

  function genSentenceStyle(index: number): object {
    let style = {};

    if (index >= firstSentencePos && index < firstSentencePos + maxRow) {
      const diff = index - firstSentencePos;
      const scale = (maxRow - diff) / 3;
      const rowIndex = Math.floor(diff); // 屏幕可视区域内的第几行
      let offsetY = rowIndex <= 2 ? `${(3 - rowIndex)*-10}px` : '0'; // 0,1,2 行需要往上移动让出变大的空间
      // let offsetY = '0'
      // let transformOrigin = rowIndex <= 2 ? 'top' : 'top';
      let transformOrigin = rowIndex <= 2 ? 'top' : 'top';
      let opacity = opacityMap[rowIndex];

      style = {
        transform: `scale(${scale}) translate(0, ${offsetY})`,
        // transformOrigin,
        opacity,
      };
    }

    if (index >= 0 && index < firstSentencePos) {
      style = {
        transform: 'scale(2) translate(0, 0%)',
        opacity: 0,
      };
    }

    if (index > firstSentencePos + maxRow) {
      style = {
        transform: 'scale(0)',
        opacity: 0,
      };
    }

    return style;
  }

  function handleScroll(e: UIEvent) {
    if (timeoutId) return;

    const t = e.target as HTMLElement;

    t.scrollTop < 10 ? setReachTop(true) : setReachTop(false);

    setFirstSentencePos(t.scrollTop / (t.scrollHeight / sentences.length));

    const persent = Math.ceil(
      (t.scrollTop / (t.scrollHeight - t.offsetHeight)) * 100
    );
    onReadingProgressChange(persent);
    // console.log({
    //   persent,
    // });

    const id = window.setTimeout(() => {
      saveTimeoutId(0);
    }, 0);

    saveTimeoutId(id);
  }

  function handleWhell(e: WheelEvent) {
    console.dir(e.deltaY);
    setWheelDeltaY(e.deltaY);
  }

  return (
    <div className="screen-one">
      <div className="screen-one__bg">
        <video
          loop
          autoPlay
          muted
          src="/intro.mp4"
        ></video>
      </div>
      <div
        ref={sentenceContainer}
        className={`
          screen-one__sentence-container
          text-[30px] lg:text-[48px]`}
        onScroll={handleScroll}
        onWheel={handleWhell}
      >
        {sentences.map((i, index) => (
          <div
            className={`screen-one__sentence`}
            key={index}
            style={genSentenceStyle(index)}
          >
            {i}
          </div>
        ))}
      </div>
      <div
        className={`
          screen-one__intro-paragraph
          hidden lg:block
          transition-[opacity] duration-1000
          ${isReachTop ? 'z-[1] opacity-100' : 'z-0 opacity-0'}`}
      >
        <p>
          Feed is an intelligent property rights and payments platform, using
          intelligent software and digital security that goes well beyond
          &apos;military-grade&lsquo; to give users true ownership of their data and IP.
        </p>
        <p>
          Feed facilitates trusted exchanges of users progressively-perfecting
          data assets with businesses, researchers, and governments in a{' '}
          <b>trusted</b>, audited, and independently verifiable manner; on their
          own terms and conditions.
        </p>
      </div>
      <div className="screen-scroll-tip">SCROLL DOWN</div>
    </div>
  );
}
