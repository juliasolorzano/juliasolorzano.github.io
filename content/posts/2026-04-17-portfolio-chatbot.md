---
date: 2026-04-17
slug: portfolio-chatbot
title: "The Portfolio as Conversation"
description: "An experiment in replacing traditional portfolio navigation with a guided chatbot — pre-scripted, static, bilingual, and accessible."
image: /assets/images/og-portfolio-chatbot.png
---

*I recently wrote about [rebuilding my personal website from scratch](/blog/2026/03/17/rebuilding-my-site/) — new framework, new design, bilingual content, accessibility-first architecture. Since then I have kept building. This is about an experiment: a chatbot that lets visitors explore my work through conversation instead of navigation.*

***

Portfolio sites have always been information architecture problems. You organize your work into sections — experience, projects, writing, about — and you design navigation that helps people find what they need. You think about hierarchy, labeling, wayfinding. You test whether the thing you called "Work" should actually be called "Projects." You optimize for the person who lands on your site and already knows what they are looking for.

That assumption has started to shift.

***

We are in a moment where the way people find information is changing. AI has made it easier than ever for someone to get what they need — or discover what they did not know they wanted — through conversation rather than browsing. People are increasingly comfortable asking a question and getting an answer instead of scanning a menu and clicking through pages. The interaction model is shifting from "browse and discover" to "ask and receive."

I have spent years thinking about information architecture — in government, in design systems, in enterprise software. It is work I care about deeply. But I have also started wondering what happens to the portfolio site when the people visiting it expect a different kind of interaction. When they are used to typing a question and having something respond, what does it mean to hand them a sidebar and say figure it out?

***

So I built a chatbot. You can find it at [/chat](/chat/).

It is not powered by a language model. There is no API call, no generated text, no machine learning. It is a guided decision tree — a set of pre-written conversation nodes with clickable response buttons. You land on the page, the bot says hello, and it offers you a few paths: my work experience, projects I have built, my writing, a bit about me, or how to get in touch. You pick one, it responds with more detail, and you keep going. Every path leads somewhere useful — a page on this site, an external link, or a way to circle back and explore something else.

The conversation content covers my full career. Over twenty years in tech. It is all there, organized not by page hierarchy but by conversational flow. The bot gives you a few sentences, then asks what you want to know next. You never have to figure out where something lives in a menu.

***

The technical implementation is intentionally simple. The entire conversation tree lives in a YAML data file — one set of nodes for English, one for Spanish. Hugo serializes it into inline JSON at build time, so there are no fetch requests and no external dependencies. The JavaScript engine is a single vanilla JS file in an IIFE that reads the data from a `<script>` tag, renders messages one at a time with a typing indicator for conversational rhythm, and presents choices as real `<button>` elements.

Accessibility was also a priority. The chat container has `role="log"` and `aria-live="polite"` so screen readers announce new messages as they appear. Every message bubble includes a visually hidden speaker label — "Julia:" or "You:" — so screen reader users know who said what. Focus management moves to the first choice button after the bot finishes responding, and the whole thing respects `prefers-reduced-motion` — if you have that setting enabled, the typing animations and delays disappear entirely. Choice buttons that open external links announce it: "opens in a new tab."

***

What I like about this experiment is that it reframes the portfolio from something you navigate to something you converse with. It is a different modality. Some visitors will prefer the traditional sidebar and pages — and those are all still there, exactly where they have always been. But some visitors might prefer to be guided. To say "I am curious about your government work" and have the site respond with the relevant details and a link to dig deeper.

It changes the feeling of the interaction. Instead of arriving and figuring out where to click, you arrive and someone asks you what you are interested in. That is a meaningfully different experience — even when the answers are pre-scripted.

***

This is an experiment. I am not adding the chatbot to my main navigation yet. I have other ideas about where this could go — ways to make the portfolio site feel more responsive to the person visiting it. This is the first step.

If you want to try it, head to [/chat](/chat/) and let me know what you think. I am genuinely curious whether this concept resonates — whether the portfolio-as-conversation feels useful, just novel, or something in between.

More to come.
