参考 http://www.feedmusic.com/ 做的网站，功能完全实现，且在细节上有众多额外增强和优化。完全手写代码，无使用任何相关动画库或三方库。

演示地址：<http://120.76.99.189:3000>

源码地址：<https://github.com/yitaqin/fancy-demo>

## Features

- 第一屏视频动态背景。
- 第一屏主段落文字的滚动效果。由下往上逐渐变大并淡出屏幕区域；最后一段标语单独占满全屏。
- 第一屏左下方的小字描述，在主段落滚动时联动渐显/渐隐，窄屏时完全隐藏。
- 第一屏主段落的滚动与顶部导航栏的进度条联动。
- 第二屏动态背景。进入第二屏后背景开始动态缓慢扩张。
- 第二屏进入时，视频框从屏幕外移入，视频标题文字从框内移入，离开第二屏后自动重置位置。
- 第二屏视频框缩放效果。点击播放按钮后视频框扩展至全屏状态；播放按钮及文字淡出；关闭按钮渐显，按钮带悬停交互效果；视频开始自动播放。
- 任意屏幕比例的自适应。包括手机窄屏和 PC 宽屏。
- 两个屏幕之间的切换效果。包含切换动效以及滚动视差效果。
- 顶部导航栏右侧菜单按钮的动效。bars 与 x-mark 的流畅切换；bars 状态时鼠标移入后 bar 间距扩展；向x-mark 状态时鼠标移入后 x 会变扁。
- 点击菜单按钮后切换至全屏菜单，此时导航项隐藏且 Logo 和 x 常驻。
- 顶部导航项 "INTRODUCTION" "THE TECHNOLOGY" 点击后自动切换至对应屏幕，且文字下方相关指示条和进度条能联动切换。

## 对比原版的 - 优化/增强

- 原版的整体动画效果非常缓慢，而且有很强的迟滞感。
  - 增强版缩短了各种动画的执行时长，动效更加简洁干练，提高使用体验。
- 原版的菜单按钮在 bars 和 x-mark 的转换时，动效混乱，两条 bar 的旋转方向并不一致。
  - 增强版一直的旋转方向，更加简洁的动效体验，带来流畅感。
- 原版的屏幕切换很迟滞，且在手机浏览器下无法从第二屏通过滑动的方式回到第一屏。
  - 增强版屏幕间可通过上下滑动的方式流畅切换。
- 原版第一屏的主段落文字无法实现快速滚动，非常影响用户使用体验。
  - 增强版重复利用浏览器滚动机制，能实现手指/滚轮快速滑动的惯性加速效果，一滑到底的流畅。
- 原版的视频播放逻辑有缺陷，每次切换视频框都会让视频重头开始播放。
  - 增强版在视频框关闭时保留播放进度，重新打开后自动继续播放视频。


## Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deploy on self-hosting

```bash
pm2 start npm -- run start
```