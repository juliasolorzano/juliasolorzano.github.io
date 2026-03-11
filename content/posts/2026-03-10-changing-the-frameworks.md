---
date: 2026-03-10
slug: part-1-changing-the-frameworks
title: "Part 1: Ch-ch-ch-ch-changes"
image: /assets/images/og-part-1-changing-the-frameworks.png
---

*This is the first in a series of five writings about the updates I am making to my personal website — from migrating the framework, to redesigning the layout, to translating the entire site into Spanish, and more. I am working alongside [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview), running Anthropic's Opus 4.6 locally, to make these changes. Part 1 covers the framework migration itself.*

***

*Ch-ch-ch-ch-changes, turn and face the strange.*

My site has run on [Jekyll](https://jekyllrb.com/) since March 2013. Thirteen years. Through job changes, redesigns, and dozens of writings, Jekyll was the quiet constant underneath it all. It worked. It was familiar.

But the ecosystem moved on. Jekyll's development slowed. The energy in the static site generator space shifted to newer, faster tools. Ruby dependencies still needed tending — merging Dependabot patches for kramdown, rexml, addressable — and the Gemfile was becoming the most actively maintained file in the repo. It was time to turn and face the strange.

***

*Ch-ch-changes, just gonna have to be a different man.*

I have loved [Hugo](https://gohugo.io/) since it originally launched. It is built on Go, it compiles lightning quick, and I have used it to build multiple sites over the years — including the website for my wedding invitation. So when I decided to move off Jekyll, Hugo was not even a question. It was the answer.

No Gemfile. No `bundle install`. No Ruby version manager. Just Hugo. Build times went from seconds to milliseconds, which honestly still surprises me. And [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/) handles SCSS compilation natively, so I could drop the separate Sass toolchain that Jekyll required — including that odd convention of putting YAML front matter delimiters at the top of `.scss` files. If you know, you know.

The learning curve is not so bad, either. The [documentation](https://gohugo.io/documentation/) is great and the concepts are familiar enough for someone who has been coding for over 20 years. Go templates are more verbose than Liquid, sure. But the tradeoff is a tool that is fast, self-contained, and actively maintained. It is just cool.

***

Before I migrated a single file, I ran a link audit across the entire Jekyll site. Thirteen years of blogging leaves a trail of dead URLs, and I found 31 of them spread across 19 files. I fixed every one before touching anything else. It felt important to start from a clean foundation rather than carry broken things forward into a new home.

Then I did something that, in retrospect, was either brave or reckless. I migrated everything in one commit.

130 files changed. 429 insertions. 403 deletions. The commit message: *"Lets go Hugo, lets go!"*

Blog posts moved from their old Jekyll directories into Hugo's content structure. Layouts reshuffled. Includes became partials. Front matter got updated. The things that needed to change, changed. But the thing I cared most about preserving — every single URL — stayed exactly where it was. Every writing on my site had lived at the same address for over a decade. People had linked to those addresses. Search engines had indexed them. Hugo made it simple to keep them intact, and I was not about to break that trust.

***

A migration is also a chance to let go of things you have been carrying around. And I cut a lot.

[jQuery](https://jquery.com/) and [Velocity.js](http://velocityjs.org/) — gone, replaced with vanilla JavaScript. Self-hosted font files for Raleway and OpenSans — gone, swapped for [Lora](https://fonts.google.com/specimen/Lora) and [Inter](https://fonts.google.com/specimen/Inter) through Google Fonts. The Gemfile — gone entirely. The hand-rolled RSS feed template that Jekyll required — gone, because Hugo just generates one for you. And Disqus comments, which had been on the site since day one — gone without hesitation.

The site got lighter. The repo got cleaner. *Ch-ch-changes, don't want to be a richer man.* Just a simpler one. And for the first time in a while, I was excited to build on top of it.

***

The entire migration — the link audit, the file restructuring, the permalink preservation, the cleanup — took roughly 10 hours of active coding time. I worked alongside Claude, Anthropic's AI model, running [Opus 4.6 locally through Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview). I directed the work, made the decisions, and reviewed every change. Claude handled the tedious parts at a pace I could not have matched alone. On my own, this would have been a month or more of evenings and weekends.

But the framework swap turned out to be just the starting point. Once the foundation was in Hugo, the code started evolving in ways that Jekyll had made feel cumbersome — a complete design overhaul, a full Spanish translation, mobile-specific layouts, accessibility work, and more.

*Time may change me, but I can't trace time.*

I will leave all of that for the next writing.
