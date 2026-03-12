---
date: 2026-03-11
slug: part-2-designing-the-layout
title: "Part 2: Modern Love"
image: /assets/images/og-part-2-designing-the-layout.png
---

*This is the second in a series of five writings about the updates I am making to my personal website. [Part 1](/blog/2026/03/10/part-1-changing-the-frameworks/) covered the migration from Jekyll to Hugo. Part 2 is about the design overhaul — the visual and interaction decisions that gave the site its current shape.*

***

*Modern love walks beside me. Modern love walks on by.*

Once Hugo was in place, the code was clean, but the site still looked like its old self. The layout, the colors, the typography — all of it carried over from a design I had built years ago. It worked, but it did not feel like me anymore. I wanted something warmer. Something more intentional. Something that felt less like a tech portfolio and more like a home.

So I started over visually, and the first thing I changed was the navigation.

***

*Modern love gets me to the church on time.*

Most personal sites put navigation at the top. A horizontal bar, a logo on the left, links on the right. I went the other direction — a fixed sidebar on the left, always visible, always there. My name at the top, navigation in the middle, social links at the bottom. On desktop it stays put while you scroll through content. It felt right for a personal site. The navigation is not something you pass through on the way to the content. It is something that sits beside it, quietly.

***

The colors came next. I did not want the typical black-on-white minimalism or the bright blues and purples that saturate tech. I wanted earth. Warm beige backgrounds. Dark brown text. Gold accents. Saddle brown links that shift to teal on hover. The palette pulls from browns, golds, and warm grays — tones that feel grounded and human, like paper and ink and old leather.

For typography, I paired [Lora](https://fonts.google.com/specimen/Lora) for headings with [Inter](https://fonts.google.com/specimen/Inter) for body text. Lora is a serif with personality — it gives headings an editorial quality. Inter is clean and highly readable at small sizes. The combination gives the site a warmth that a single sans-serif stack never could.

***

*There's no sign of life. It's just the power to charm.*

Dark mode was not optional. The entire color system is built on [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), so flipping between light and dark is a matter of swapping variable values. The site checks three things in order: your saved preference in localStorage, the explicit toggle you clicked, and your operating system's setting. In dark mode, the warm beiges become deep charcoals and the gold accents brighten. The warmth stays, even in the dark.

***

*I know when to go out. I know when to stay in.*

On phones — actual phones, detected by User-Agent, not just narrow viewports — the site transforms. The sidebar disappears entirely. A bottom tab bar takes its place, modeled after [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/). Touch targets are 44 points minimum. The header and tab bar use backdrop blur for that frosted glass look. Headings grow to 34 pixels, matching iOS large titles. System fonts load instead of web fonts. It is not a responsive breakpoint. It is a different experience, designed for the device you are holding.

***

Accessibility was not an afterthought. It was baked in from the start. A skip-navigation link sits at the top of every page for keyboard users. Focus indicators are visible — 2 pixels, solid, with offset so they do not crowd the element. Every interactive component carries proper ARIA labels. The sidebar navigation uses `aria-current` to announce the active page. And for users who prefer reduced motion, all animations and transitions are disabled with a single media query. These are not features. They are the foundation.

***

*Modern love. It's not really work.*

The whole thing runs on vanilla JavaScript and SCSS compiled through Hugo Pipes. No React. No Tailwind. No build toolchain beyond Hugo itself. The menu toggle, the dark mode switch, the mobile detection — all of it is plain JavaScript, and the total footprint is tiny. After years of watching sites balloon with dependencies, it felt good to build something that loads fast because there is simply less to load.

***

The design is the part that made the site feel like mine again. The framework swap gave me a foundation. The design gave it a voice.

*But I try. I try.*

Next up: translating the entire site into Spanish.
