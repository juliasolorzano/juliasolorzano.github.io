---
date: 2026-03-13
slug: part-4-building-for-mobile
title: "Part 4: Space Oddity"
description: "Building a mobile experience with a bottom tab bar, 44pt touch targets, system fonts, and device-aware detection — not just responsive breakpoints."
image: /assets/images/og-part-4-building-for-mobile.png
---

*This is the fourth in a series of five writings about the updates I am making to my personal website. [Part 1](/blog/2026/03/10/part-1-changing-the-frameworks/) covered the migration from Jekyll to Hugo. [Part 2](/blog/2026/03/11/part-2-designing-the-layout/) covered the design overhaul. [Part 3](/blog/2026/03/12/part-3-translating-into-spanish/) covered translating the site into Spanish. Part 4 is about building a mobile experience that feels native.*

***

*Ground control to Major Tom.*

Most personal sites treat mobile as a concession. You take the desktop layout, squeeze it into a narrower viewport, and call it responsive. I wanted something different. I wanted the mobile version of this site to feel like it was built for the phone first — not adapted from the desktop after the fact.

That meant more than media queries. It meant rethinking the entire interaction model for a device you hold in one hand.

***

*Take your protein pills and put your helmet on.*

The first thing that had to go was the sidebar. On desktop, a fixed sidebar feels natural — your navigation sits quietly to the left while content scrolls on the right. On a phone, a sidebar is dead weight. It either takes up a third of your screen or hides behind a hamburger menu that nobody wants to open.

So I replaced it entirely. On mobile, the site uses a bottom tab bar — five icons pinned to the bottom of the screen, always within thumb reach. Home, blog, work, about, and a menu for everything else. The pattern comes straight from [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/tab-bars), and there is a reason every major iOS app uses it. It is where your thumb already is.

***

*Commencing countdown, engines on.*

The detection is deliberate. I do not rely on viewport width alone. A 768-pixel-wide browser window on a laptop is not the same as a 768-pixel-wide screen on a tablet you are holding in your hands. The site checks the User-Agent string to determine whether you are on an actual mobile device — iPhone, iPad, Android — and serves the mobile experience only when you are. Desktop users with narrow windows get the desktop layout, just narrower. Mobile users get a layout designed for touch.

***

*Check ignition and may God's love be with you.*

Touch targets matter more than people think. Apple recommends a minimum of 44 by 44 points for any tappable element. I followed that everywhere — navigation links, buttons, the language switcher, the dark mode toggle. Nothing on the mobile site requires precision tapping. If your thumb can reach it, your thumb can hit it.

The header and tab bar both use `backdrop-filter: blur` for that frosted glass effect you see in native iOS apps. It is a small detail, but it is the kind of detail that makes a web page stop feeling like a web page. Content scrolls underneath the bars and you catch a soft blur of color through the glass. It feels right.

***

*This is Ground Control to Major Tom, you've really made the grade.*

Typography shifts too. Headings jump to 34 pixels on mobile, matching the large title convention from iOS. Body text stays at a comfortable reading size, but the hierarchy changes — on a small screen, the headline needs to announce itself more clearly. I also swap web fonts for system fonts on mobile. No Lora. No Inter. Just the native font stack — San Francisco on iOS, Roboto on Android. The text renders instantly because there is nothing to download, and it looks like it belongs on the device.

***

*And the papers want to know whose shirts you wear.*

The blog listing page adapts too. On desktop, posts are listed with their full titles and dates in a clean vertical stack. On mobile, the same list gets tighter spacing, larger touch targets, and a reading time estimate that helps you decide whether to open something during a two-minute wait or save it for later. Every link in the list is easy to tap without accidentally hitting the one above or below it.

***

*Here am I floating round my tin can, far above the world.*

There is a moment that happens when you visit a site on your phone and something feels off. Maybe the text is too small. Maybe a button is just slightly too hard to tap. Maybe the layout was clearly designed for a screen three times wider. You might not be able to name the problem, but you feel it. That is what I wanted to eliminate. Not just technically, but experientially. The phone version of this site should feel like it was always a phone app. No compromises. No "pinch to zoom." No "rotate your device."

***

*Planet Earth is blue, and there's nothing I can do.*

Building for mobile this way took longer than treating it as a responsive afterthought. But the result is a site that works the way your phone works — with touch, with thumb reach, with the visual language you already know from the apps you use every day. It is not a smaller version of the desktop site. It is its own thing.

***

*Though I'm past one hundred thousand miles, I'm feeling very still.*

Next up: the final part — deployment, performance, and getting the whole thing live.
