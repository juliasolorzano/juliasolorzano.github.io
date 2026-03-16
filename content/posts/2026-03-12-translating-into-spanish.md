---
date: 2026-03-12
slug: part-3-translating-into-spanish
title: "Part 3: \"Heroes\""
description: "Translating every page and all 54 blog posts into Spanish using Hugo's multilingual framework, i18n files, and hreflang tags."
image: /assets/images/og-part-3-translating-into-spanish.png
---

*This is the third in a series of five writings about the updates I am making to my personal website. [Part 1](/blog/2026/03/10/part-1-changing-the-frameworks/) covered the migration from Jekyll to Hugo. [Part 2](/blog/2026/03/11/part-2-designing-the-layout/) covered the design overhaul. Part 3 is about translating the entire site into Spanish.*

***

*We can be heroes, just for one day.*

When Bowie recorded "Heroes" in 1977, he did not stop at the English version. He recorded it again in German as "Helden" and again in French as "Héros." Same song, same feeling, different words. That is what I wanted for this site — not a translated version that felt like an afterthought, but a Spanish version that felt like it belonged there from the beginning.

Over 27 million people in the United States speak English less than "very well." Spanish is the most spoken non-English language in the country by a wide margin. I have spent part of my career working on [language accessibility in government services](https://digital.gov/2024/12/17/approaching-language-translations-to-provide-a-better-user-experience/), and I believe that if you can offer your work in more than one language, you should. My site has been English-only for over a decade. So when I rebuilt it in Hugo, I decided it was finally time to make it bilingual.

***

*I, I will be king. And you, you will be queen.*

Hugo makes multilingual sites remarkably straightforward. Every content file gets a language suffix — `about.md` for English, `about.es.md` for Spanish. The framework handles the rest. English pages live at their original URLs. Spanish pages live under `/es/`. No subdomain. No separate repo. Just a parallel set of content sitting right alongside the original.

The configuration is clean. Two language blocks in `hugo.toml` — one for `en` with `en-US` as the language code, one for `es` with `es-MX`. Weight values control which language is the default. English stays primary. Spanish is one click away.

***

*Though nothing will drive them away, we can beat them, just for one day.*

The hardest part was not the framework. It was the language itself.

I translated every page on the site. The about page. The work page. The now page. The resume. Every single blog post going back over a decade — all 54 of them. Each one got a `.es.md` file with its own front matter, its own URL under `/es/`, and its own translation.

This was not a copy-paste through a translation API. These are my words, my stories, my career. The translations needed to sound like me in Spanish, not like me run through a filter. Some posts were straightforward. Others required rethinking entire paragraphs because the structure of the idea worked differently in Spanish than in English. Idioms do not translate. Humor shifts. Even the rhythm of a sentence changes when you move between languages.

***

*We can be heroes. We can be heroes. We can be heroes. Just for one day.*

For the UI, I built out two i18n files — `en.toml` and `es.toml` — with every string the site displays. Navigation labels. Button text. Metadata like "min read" becoming "min de lectura." The 404 page. The skip-to-content link for screen readers. Even the SEO keywords are different per language, because the terms people search in English are not the same terms they search in Spanish.

A language switcher sits in the sidebar on desktop and in the header on mobile. It only appears when the current page has a translation available — which, now, is every page. Click "ES" and you land on the same content in Spanish. Click "EN" and you are back. Hugo's `.IsTranslated` and `.Translations` make this almost trivially simple in the template. The `relLangURL` filter handles all the URL prefixing automatically. What took the most thought was not the code — it was making sure the experience felt seamless, like the site was always bilingual.

***

*I, I can remember standing by the wall.*

The SEO side mattered too. Every page now carries `hreflang` tags in the head — one pointing to the English version, one pointing to the Spanish version, and an `x-default` fallback. Search engines use these to serve the right version to the right audience. A Spanish speaker in Mexico City searching for my name should land on the Spanish page. An English speaker in Denver should land on the English one. The tags make that possible.

***

*We're nothing, and nothing will help us.*

There are things I still think about. Whether some of the older posts even needed translating. Whether anyone will read the Spanish versions at all. But that last question misses the point. This was not about traffic. It was about accessibility. If my professional work has taught me anything, it is that language should not be a barrier — not in government services, and not on a personal site either.

***

*We can be heroes, just for one day.*

Fifty-four blog posts. Six standalone pages. Over a hundred i18n strings. Every URL mirrored. Every piece of metadata translated. The site is fully bilingual now, and it feels like it should have been all along.

Next up: making the site work on mobile — not just responsive, but truly designed for the device in your hand.
