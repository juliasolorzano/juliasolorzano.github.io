---
date: 2026-03-17
slug: rebuilding-my-site
title: "Turn and Face the Strange"
description: "A complete rebuild of my personal website — new framework, new design, bilingual content, mobile-native layout, accessibility-first architecture, and answer engine optimization."
image: /assets/images/og-rebuilding-my-site.png
---

In 1999, David Bowie sat across from Jeremy Paxman on [BBC Newsnight](https://www.youtube.com/watch?v=FiK7s_0tGsg) and told him the internet was going to change everything. Paxman pushed back — it was just a tool, he said. Bowie shook his head. "No. It's an alien life form." He talked about the wall between artist and audience breaking down, about how the interplay between the user and the provider would crush our idea of what mediums are all about. Paxman was skeptical. Bowie was right.

Bowie spent his career refusing to stay in one place. He reinvented his sound, his image, and his process — not because what he had was broken, but because he understood that standing still meant falling behind. He [called out MTV in 1983](https://www.youtube.com/watch?v=XZGiVzIr8Qg) for not featuring Black artists. He released *Blackstar* two days before he died — a final reinvention, on his own terms. He did not wait for the industry to catch up. He moved first and let the culture follow.

The way we build for the web is in that kind of moment right now. The tools are changing, the way people find information is changing, and the role of the person writing the code is changing. I rebuilt my personal site from scratch this year — not just the look, but the foundation underneath it — and I named the series after his songs because his ethos felt like the right frame for a project about tearing something down and rebuilding it for what comes next.

My site had not changed in 13 years. Same framework. Same layout. Same everything. I wrote about the rebuild as I went — a five-part series plus two standalone posts on accessibility and answer engine optimization. This is the overview — what I did, why I did it, and where to go if you want the details.

***

**I moved from Jekyll to Hugo.** My site had been running on Jekyll since 2013. It worked, but the build times were slow, the dependencies were heavy, and the multilingual support I needed did not exist without plugins. Hugo gave me faster builds, native i18n, and a cleaner content structure. I rewrote every template, cleaned up dead links going back a decade, and preserved every URL so nothing broke. [Read more about the migration.](/blog/2026/03/10/part-1-changing-the-frameworks/)

***

**I redesigned the layout.** The old design was a standard blog template. The new one has a fixed sidebar on desktop with warm earth tones, Lora headings, Inter body text, and a dark mode that respects your operating system preference. It is intentionally not the minimal tech site you see everywhere. It looks like it belongs to a person, not a template. [Read more about the design.](/blog/2026/03/11/part-2-designing-the-layout/)

***

**I translated the entire site into Spanish.** Every page. All 54 blog posts. Every navigation label, button, and UI string. Not through a translation API — by hand. Language access has been part of my professional work at [Login.gov](https://login.gov) and [18F](https://18f.org), and I wrote about [approaching language translations in government services](https://digital.gov/2024/12/17/approaching-language-translations-to-provide-a-better-user-experience/) for Digital.gov. The same principle applies here — language should not be a barrier to accessing someone's work. [Read more about the translation.](/blog/2026/03/12/part-3-translating-into-spanish/)

***

**I built the mobile experience from the ground up.** Not a responsive version of the desktop site — its own thing. A bottom tab bar with five icons always within thumb reach. 44-point touch targets everywhere. System fonts instead of web fonts. Frosted glass effects on the header and tab bar. The site detects whether you are on an actual mobile device and serves a layout designed for touch. [Read more about the mobile build.](/blog/2026/03/13/part-4-building-for-mobile/)

***

**I made accessibility the foundation.** Visible focus indicators on every interactive element. A skip-navigation link that is translated into both languages. A focus trap on the mobile menu. `aria-current`, `aria-expanded`, and `aria-live` attributes updating dynamically. `prefers-reduced-motion` respected across the entire site. Dark mode with contrast ratios that hold in both light and dark. These are not extras added at the end — they are decisions made from the start. [Read more about accessibility.](/blog/2026/03/15/accessibility-is-the-foundation/)

***

**I optimized for answer engines, not just search engines.** [Gartner estimates](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents) traditional search volume will drop 25 percent by 2026. People are asking ChatGPT, Perplexity, and Claude instead of typing keywords into Google. I added structured data schemas — Person, BlogPosting, CreativeWork — wrote meta descriptions for every page, and opened my `robots.txt` to AI crawlers. Traditional SEO gets you ranked. Answer engine optimization gets you cited. [Read more about AEO.](/blog/2026/03/16/answer-engine-optimization/)

***

**I built it alongside AI.** [Simon Willison](https://simonwillison.net/) describes how coding agents work in his [guide to agentic engineering patterns](https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/) — an LLM at the core, a system prompt with instructions, and a set of tools it can call in a loop. The agent reads files, searches code, writes edits, runs commands, and feeds the results back into its own context to decide what to do next. Not a chatbot you paste questions into — a tool loop that can read a codebase, generate an image, verify a source, and write code across multiple files in a single session.

That is what I worked with. I partnered with Claude (Opus 4.6) throughout this project — for research, drafting, code generation, image creation, and source verification. Every design decision, every architectural choice, every word in every translation was mine. What changed was the speed and range of what I could take on in a short window.

Understanding that architecture changed how I worked with it. I learned to give it context (read this file first), constrain its scope (only touch this section), and verify its output (show me the screenshot). The more I understood the loop, the better the collaboration got. I am planning to write more about what that collaboration looks like.

***

This was not a weekend project. It was a deliberate, ground-up rebuild of something I have maintained for over a decade. The site is faster, more accessible, fully bilingual, and built for how people find information in 2026 — not 2013.

If any of this is useful to you, the detailed posts are all on my [Writing](/writing/) page. If you want to talk about accessibility, language access, AEO, or working with AI, I am always happy to connect.
