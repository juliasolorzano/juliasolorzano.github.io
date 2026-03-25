---
date: 2026-03-25
slug: testing-the-foundation
title: "Testing the Foundation: What 'Working' Actually Means"
description: "Adding a lightweight test suite to a static Hugo site — translation parity, accessibility checks, component rendering, and dark mode — because the things that matter most are the easiest to break."
image: /assets/images/og-testing-the-foundation.png
---

*After rebuilding my personal site, translating it into two languages, adding accessibility features, and shipping a text-to-speech player, I realized I had no way of knowing if any of it still worked. This is about adding tests — and about a way of thinking that starts with the end in mind.*

***

I have always been lazy about writing tests. Not philosophically opposed — just lazy. The site worked. I could see it working. I would make a change, refresh the browser, and move on. That is fine when a site is simple. It is less fine when a site has two languages, sixty translation keys, ARIA attributes on every interactive element, a text-to-speech player with screen reader semantics, a dark mode that swaps an entire color system, and a mobile menu with focus trapping. At some point the surface area gets wide enough that your eyes are not a reliable test suite anymore.

What pushed me to finally do it was a specific fear: that I would change a template, push to main, and silently break something I care about. A missing `aria-label`. A translation key that exists in English but not in Spanish. A progress bar that lost its `role="progressbar"`. These are not the kind of things that show up as a blank page. They show up as an experience that quietly degrades for the people who need it most.

***

I enjoy test-driven development. Not the strict red-green-refactor cycle that some teams practice — though I respect that discipline — but the underlying mode of thinking. [TDD](https://en.wikipedia.org/wiki/Test-driven_development) asks you to start with what should be true and work backward to make it true. You write the assertion before you write the code. You define the outcome before you build the mechanism.

That inversion is powerful even when you are not writing tests first. It forces you to articulate what "working" actually means. Not "the page loads" but "the skip link targets `#content` and reads 'Skip to main content' in English and 'Ir al contenido principal' in Spanish." Not "dark mode works" but "when `data-theme` is set to `dark`, the CSS custom property `--color-bg` changes from `#f0ede2` to `#1c1b1a`." Precision in your expectations leads to precision in your implementation.

When I sat down to add tests to this site, I was not retrofitting. I was finally writing down what I already believed should be true — and giving myself a way to verify it automatically.

***

The test suite has two layers, ordered fast to slow.

The first is a Node.js script that checks translation parity. It reads `en.toml` and `es.toml`, compares every key, and fails if a key exists in one file but not the other, or if any key has an empty value. It runs in about a hundred milliseconds. No browser, no build, no dependencies beyond a small TOML parser. This is the canary — if I add a new UI string in English and forget to translate it, I know immediately.

The second layer is [Playwright](https://playwright.dev/). It builds the site with Hugo, serves the static output, and runs a headless browser against it. Nineteen tests across five areas:

**Accessibility on the English homepage** — the skip link exists and targets `#content`, the `lang` attribute is `en`, the main landmark exists, the navigation has an `aria-label`, the theme toggle has `aria-pressed`, and every external link has `rel="noopener"`.

**Accessibility on the Spanish homepage** — the `lang` attribute is `es`, the skip link reads "Ir al contenido principal," the navigation labels are in Spanish, and `hreflang` tags exist for both languages.

**Component rendering** — the sidebar has five nav links with the correct text, the footer renders, the language switcher shows "ES" on the English page, and the mobile menu button has `aria-expanded` and `aria-controls`.

**The TTS player** — on a blog post, the player has `role="region"` with an `aria-label`, the play button has an `aria-label`, the progress bar has `role="progressbar"` with the correct value attributes, and the screen reader status region has `aria-live="polite"`.

**Dark mode** — the CSS custom properties for background and text color match the light theme values, then match the dark theme values after toggling `data-theme`.

The whole suite runs in about fourteen seconds. Most of that is browser startup. The individual tests take half a second each.

***

The tests run in two places. Locally, `npm test` chains the translation check, the Hugo build, and the Playwright suite. In CI, a dedicated GitHub Actions workflow runs on every push to main and on every pull request. It is decoupled from the deploy workflow on purpose — I want the freedom to evolve each independently. Tests failing should not block me from investigating a deploy issue, and a deploy issue should not mask a test failure.

I chose to keep the test infrastructure minimal. Three dev dependencies: Playwright, a static file server, and a TOML parser. No test runner wrapper. No assertion library beyond what Playwright provides. No visual regression snapshots. No full WCAG audit — though that is one import away with [`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright) if I want it later. The goal was the smallest suite that catches the things most likely to break.

***

There is a satisfaction in running a test suite and seeing green checkmarks. But the real value is not in the green. It is in the future red — the failure that tells me I broke something before anyone else has to discover it. Every test is a small promise: this matters, and I will know if it stops working.

I built this site to be accessible, bilingual, and thoughtfully designed. Now I have a way to make sure it stays that way.
