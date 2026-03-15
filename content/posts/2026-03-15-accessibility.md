---
date: 2026-03-15
slug: accessibility-is-the-foundation
title: "Accessibility is the Foundation"
image: /assets/images/og-accessibility-is-the-foundation.png
---

*Accessibility is not a feature you bolt on at the end. It is the foundation you build on from the start. This is how I approached it when I rebuilt my personal site.*

***

Every interactive element on this site has a visible [focus indicator](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible). A 2-pixel solid outline in the accent color, offset by 2 pixels so it does not crowd the element. Buttons, links, navigation items, the language switcher, the dark mode toggle — all of them. If you navigate this site with a keyboard, you always know where you are. The [WCAG 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html) criterion calls this a Level AA requirement. I call it the bare minimum.

This sounds basic. It is basic. And yet countless sites strip out focus styles because someone decided the outlines looked ugly. Removing them does not make a site cleaner. It makes it unusable for anyone who does not use a mouse.

***

The first thing in the DOM, before the sidebar, before the header, before any visible content, is a [skip-navigation link](https://webaim.org/techniques/skipnav/). It is hidden off-screen until you press Tab, at which point it slides into view with a smooth transition. Click it — or press Enter — and you jump straight to the main content area, bypassing the entire navigation. Screen reader users and keyboard users should not have to tab through the same six links on every single page.

The skip link is translated too. In English it reads "Skip to content." In Spanish, "Saltar al contenido." It pulls from the same i18n files that power the rest of the bilingual site.

***

Semantic HTML carries more weight than most developers realize. The navigation is wrapped in [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) elements with descriptive [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) attributes — "Main Navigation" for the sidebar, "Navigation" for the mobile tab bar. The content area is a `<main>` element with an `id` that the skip link targets. Blog posts are wrapped in `<article>` tags. Dates use the `<time>` element with a machine-readable `datetime` attribute. The footer is a `<footer>`.

None of this is visible to sighted users. All of it is visible to assistive technology. A screen reader can announce "Main Navigation" and a user knows exactly where they are. That is the whole point.

***

The sidebar navigation uses [`aria-current="page"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) to mark the active section. When you are on the blog page, the blog link announces itself as the current page. When you are on the about page, the about link does the same. It is a small attribute that makes a significant difference for screen reader users who need to orient themselves within a site.

On mobile, the same pattern carries over to the bottom tab bar. Each tab link gets `aria-current="page"` when it corresponds to the active section. The interaction model changes completely between desktop and mobile, but the accessibility semantics remain consistent.

***

The mobile menu implements a [focus trap](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). When you open the menu, Tab and Shift+Tab cycle through the menu items and the menu button — focus never escapes into the content behind it. Press Escape and the menu closes, returning focus to the menu button. The [`aria-expanded`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded) attribute updates dynamically — `false` when the menu is closed, `true` when it is open — so screen readers always know the current state.

This is the kind of work that takes an hour to build and that most users will never notice. But for someone navigating with a keyboard or a switch device, an untapped menu is a dead end. Focus goes behind the overlay. There is no way back. A focus trap prevents that entirely.

***

The text-to-speech player was built with screen readers in mind from the start. The player container has [`role="region"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role) with a descriptive `aria-label`. The progress bar has [`role="progressbar"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role) with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` updating in real time as the audio plays. A hidden [`aria-live="polite"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live) region announces playback state changes — "Playing," "Pause," "Stop" — without interrupting whatever the screen reader was doing before.

The play button label changes contextually. Before playback it reads "Listen." During playback it reads "Pause." After pausing it reads "Resume." These are not visible text changes. They are `aria-label` updates that only screen readers pick up. The visual button stays the same icon. The accessible name changes to match the action it will perform.

***

Every decorative SVG icon on the site carries [`aria-hidden="true"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden). The icons in the sidebar, the mobile header, the social links — none of them are announced by screen readers. They are visual decoration. The buttons and links they sit inside have their own accessible names. Announcing both the icon and the label would be redundant and confusing. Hiding the icon is the correct choice.

***

The entire site respects [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). One media query disables all animations and transitions across every element. Smooth scrolling becomes instant scrolling. Hover transitions disappear. The skip-navigation slide-in becomes a simple appear. If your operating system says you prefer reduced motion, this site listens.

This matters more than aesthetics. For people with vestibular disorders, unexpected motion can cause dizziness or nausea. A single CSS media query eliminates that risk entirely. There is no reason not to include it.

***

Dark mode is not just a visual preference. For some users, light-on-dark text is significantly easier to read. The entire color system is built on [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), so the switch between light and dark mode is a matter of swapping values. The site checks your operating system preference first, then respects any explicit toggle you have set. Contrast ratios hold in both modes because the palette was designed for both from the beginning.

***

Accessibility is not a checklist you complete at the end of a project. It is a set of decisions you make throughout. Every layout choice, every interactive element, every line of CSS — each one is an opportunity to include or exclude. I chose to include. Not because it was required, but because a site that only works for some people does not really work at all.

This is something I have cared about for a long time. Back in 2016, I wrote about [best practices for building accessible websites using the Draft U.S. Web Design Standards](https://18f.gsa.gov/blog/2016/03/29/best-practices-for-building-an-accessible-website-using-the-draft-us-web-design-standards/) while working at 18F. The tools and frameworks change, but the principle stays the same — build for everyone.
