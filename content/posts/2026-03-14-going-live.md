---
date: 2026-03-14
slug: part-5-going-live
title: "Part 5: Starman"
image: /assets/images/og-part-5-going-live.png
---

*This is the fifth and final entry in a series of writings about the updates I am making to my personal website. [Part 1](/blog/2026/03/10/part-1-changing-the-frameworks/) covered the migration from Jekyll to Hugo. [Part 2](/blog/2026/03/11/part-2-designing-the-layout/) covered the design overhaul. [Part 3](/blog/2026/03/12/part-3-translating-into-spanish/) covered translating the site into Spanish. [Part 4](/blog/2026/03/13/part-4-building-for-mobile/) covered building for mobile. Part 5 is about deployment, performance, and getting the whole thing live.*

***

*There's a starman waiting in the sky.*

At some point you have to stop building and start shipping. The framework was migrated. The design was overhauled. The site was bilingual. The mobile experience felt native. Everything worked locally. But locally does not count. A personal site that only runs on your laptop is just a folder.

So the last piece was getting it live — reliably, automatically, and fast.

***

*He'd like to come and meet us, but he thinks he'd blow our minds.*

The site is hosted on [GitHub Pages](https://pages.github.com/). It has been for years, and I saw no reason to change that. The repo is public. The hosting is free. The domain is custom. What changed was the deployment pipeline.

With Jekyll, GitHub Pages handled the build internally. You pushed your source files and GitHub compiled them on its end. It was convenient but limiting — you were locked into whatever version of Jekyll GitHub supported, and you could not use plugins or tools outside that sandbox.

Hugo is different. GitHub Pages does not build Hugo sites natively. So the build happens through [GitHub Actions](https://github.com/features/actions) — a workflow file that triggers on every push to `main`, installs Hugo, compiles the site, and deploys the output to GitHub Pages. The whole process takes about 30 seconds from push to live.

***

*Look out your window, I can see his light.*

The workflow is straightforward. A single YAML file in `.github/workflows/` defines the entire pipeline. It checks out the repo, sets up Hugo with extended support for SCSS, runs `hugo --minify` to compile and compress everything, and pushes the result to the deployment branch. No build server. No Docker container. No third-party platform. Just a GitHub Action that runs every time I push code.

I added a step to check for broken links during the build. If a link audit fails, the deployment stops. I learned that lesson during the migration — 31 dead URLs across 19 files — and I do not want to learn it again. The build catches problems before they reach the live site.

***

*If we can sparkle, he may land tonight.*

Performance was not an afterthought. Hugo compiles the entire site — every page, both languages, every asset — in under 500 milliseconds. The output is static HTML, CSS, and a small amount of JavaScript. No server-side rendering. No client-side hydration. No framework runtime shipping to the browser. The page loads and it is done.

I run the compiled output through [Lighthouse](https://developer.chrome.com/docs/lighthouse/) regularly. The scores stay high because there is simply less to measure. No third-party scripts. No analytics trackers. No cookie banners. No web fonts on mobile. The fastest request is the one you never make.

***

*Don't tell your papa or he'll get us locked up in fright.*

The SCSS compiles through Hugo Pipes, which means it is processed at build time, not at runtime. The output is a single minified CSS file with cache-busting hashes in the filename. When I change a style, the filename changes, and browsers fetch the new version automatically. When I do not change anything, the cached version holds.

Images are the usual suspect for slow sites, but this site is mostly text. The OG images for social sharing are the largest assets, and they only load when a platform fetches them for a link preview — not when a visitor loads the page. Everything else is lightweight by design.

***

*There's a starman waiting in the sky. He's told us not to blow it.*

The domain setup is simple. A CNAME record points `juliasolorzano.com` to GitHub Pages. HTTPS is handled automatically through GitHub's integration with Let's Encrypt. No certificate management. No renewal reminders. It just works, and it has worked without interruption for years.

***

*Cause he knows it's all worthwhile.*

There is something satisfying about a deployment pipeline that disappears. I write a post, I push to `main`, and 30 seconds later it is live in two languages on a site that loads fast, looks intentional, and works on every device I own. No build failures to debug. No dependencies to update. No infrastructure to maintain. Just words and code, shipped.

***

*Let the children use it. Let the children lose it. Let all the children boogie.*

This series covered five parts of a single project: a framework migration, a design overhaul, a full Spanish translation, a native mobile experience, and a deployment pipeline. The site went from a thirteen-year-old Jekyll build with outdated dependencies to a fast, bilingual, accessible Hugo site that deploys itself.

I worked alongside Opus 4.6 through [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) for the entire rebuild. I made every decision. I reviewed every change. But the pace would not have been possible alone. What might have taken months of evenings and weekends took hours of focused collaboration.

The site is live. The code is public. And for the first time in a long time, I am excited to write on it again.

*There's a starman waiting in the sky.*
