---
date: 2026-03-19
slug: adding-text-to-speech
title: "Adding Text-to-Speech (TTS) to my writings"
description: "How I added a text-to-speech player to my static Hugo site using the Web Speech API — built for accessibility, tested for screen readers, low vision, and color blindness, and handy for listening on walks and drives."
image: /assets/images/og-adding-text-to-speech.png
---

*I recently wrote a [five-part series](/blog/2026/03/10/part-1-changing-the-frameworks/) about rebuilding my personal website — migrating from Jekyll to Hugo, redesigning the layout, translating everything into Spanish, optimizing for mobile, and shipping it all. This writing is about a feature I added afterward: a text-to-speech player that lets you listen to any writing on this site.*

***

Text-to-speech is, first and foremost, an accessibility feature. It gives people who are blind or have low vision another way to consume written content. It helps people with dyslexia or reading difficulties. It supports anyone who processes information better by listening than by reading. When I decided to add it to my site, that was the starting point — making my writing available to more people in more ways.

But I also built it for myself. I go on walks most mornings, and I often come across articles I want to read but do not have time to sit down with. The same thing happens when I am driving somewhere — I will see a piece of writing that looks interesting, and I want to take it in without staring at a screen. Having a listen button at the top of a writing turns a "save for later" into a "listen right now." That convenience matters to me, and I figured it might matter to other people too.

The question was whether I could build it without a backend, without a paid API, and without adding any weight to a static Hugo site that I had just spent a week making lean.

It turns out you can.

***

The [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) is built into every modern browser. You hand it text, and it speaks. No API key. No server. No cost. The browser does the work using voices that already live on the user's device.

The tradeoff is quality. These are not the neural voices you hear from ElevenLabs or OpenAI. They are the same voices that power your phone's accessibility features — functional, clear, but unmistakably synthetic. I tested dozens of them. Some sound like a GPS from 2012. Others are surprisingly natural. On macOS, a voice called Tessa turned out to be the best of the bunch — warm, even-paced, and easy to listen to for more than a few seconds. So I set Tessa as the default voice behind the scenes, with the system's own default as a fallback for devices that do not have her.

***

The player itself is simple by design. A single bar at the top of each writing with a play button and a label that says *Listen to this post*. Press play and the controls expand: a pause button, a speed selector that cycles through 1x, 1.25x, 1.5x, and 2x, a stop button, and a progress bar that fills as the writing is read aloud.

I wanted the player to feel like part of the site, not something bolted on. The buttons match the page's color palette. They have visible borders so they look tappable. The progress bar uses the site's accent color against a subtle track. In dark mode, everything adapts. On mobile, the controls wrap onto multiple lines with generous tap targets. It should feel as natural as a play button on a podcast app.

The text extraction is deliberate too. Before speaking, the script clones the content and strips out code blocks, images, figures, and captions. What remains is the prose — the part you would actually want to hear read aloud.

***

Since text-to-speech is an accessibility feature, the player itself needs to be accessible too. That is a different problem, and the one I spent the most time on.

For screen reader users, every button has a descriptive `aria-label` that updates with the player's state. The progress bar has a `role="progressbar"` with `aria-label` and live `aria-valuenow` attributes. And I added an `aria-live="polite"` region that announces state changes — *Playing*, *Pause*, *Stop* — so a screen reader user pressing a button gets confirmation that something happened.

For low vision users, I set a minimum size of 44 by 44 pixels on every button. Before the fix, the stop button was 18 pixels wide and the speed button was barely 12. Those are fine for a mouse cursor but miserable for a finger. The focus-visible outlines were already in place — a 2-pixel accent-colored ring with offset — so keyboard navigation was covered.

For color blind users, I made sure the progress bar does not rely on color alone to convey information. The bar grows from left to right, which is a spatial cue that works regardless of how you perceive color. I also doubled the opacity of the progress track from 10 to 20 percent in both light and dark modes, so the boundary between filled and unfilled is more visible.

***

The whole feature — the player UI, the speech logic, the speed controls, the progress bar, the accessibility audit — took a single session working alongside Opus 4.6, running locally. I described what I wanted. Claude wrote the code. I tested it, gave feedback, and iterated. The accessibility checks were especially useful — we tested for screen reader semantics, touch target sizes, and color contrast issues systematically, catching things I would not have thought to check.

No npm packages were installed. No build pipeline was changed. It is one HTML partial, one JavaScript file, and a handful of SCSS rules. The JavaScript is vanilla — no framework, no dependencies. It loads with a `defer` attribute and only runs if the browser supports the Web Speech API. If it does not, the player simply does not appear. Progressive enhancement at its most literal.

***

You can try it right now. Scroll back to the top of this writing and press play. If Tessa is available on your device, you will hear her. If not, your system's default voice will step in. Either way, the words are the same.

I like building things that make a site more accessible without making it more complicated. And if it also means I can listen to my own writings on a morning walk, even better.


