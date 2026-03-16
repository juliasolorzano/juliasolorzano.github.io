---
date: 2026-03-16
slug: answer-engine-optimization
title: "Answer Engine Optimization"
description: "Why optimizing for answer engines like ChatGPT, Perplexity, and Google AI Overviews matters — and the practical changes I made to my site to prepare for the shift from traditional SEO."
image: /assets/images/og-answer-engine-optimization.png
---

For twenty years, the question was: *how do I rank on Google?*

That question is changing. It is not gone — search engines still matter. But a new layer has appeared on top of them. People are asking [ChatGPT](https://chatgpt.com/), [Perplexity](https://www.perplexity.ai/), [Google AI Overviews](https://blog.google/products/search/generative-ai-google-search-may-2024/), and [Claude](https://claude.ai/) for answers instead of typing keywords into a search bar. [Gartner estimates](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents) that traditional search engine volume will drop 25 percent by 2026 as users shift to AI-powered alternatives. And the way those tools find, evaluate, and cite your content is fundamentally different from how a search engine does it.

This is what people are calling [Answer Engine Optimization](https://neilpatel.com/blog/answer-engine-optimization/) — AEO. You might also see it called [Generative Engine Optimization](https://en.wikipedia.org/wiki/Generative_engine_optimization) (GEO), AI SEO, or AIO. The terms overlap more than they differ. AEO tends to focus on getting your content extracted as direct answers — featured snippets, AI Overviews, voice search results. GEO is broader, aimed at earning citations within AI-generated narratives from tools like ChatGPT, Perplexity, and Claude. In practice, the techniques feed into each other: structured data, clear writing, and authoritative content matter for both.

I want to be upfront — I am not an SEO expert, and I am not an AEO expert. But SEO has been part of my workflow for as long as it has been a consideration in web development. It is one of those things that, if you build websites, you learn to think about whether or not it is in your job title. With the shift toward people using AI tools instead of — or alongside — search engines, it felt like the right time to start incorporating AEO into that same workflow. Not as a specialty, but as another layer of the work I already do when I build and maintain sites.

I spent some time thinking about what that means for my site, and then I made changes. Here is what I did, why I did it, and what I think others should be paying attention to.

***

A search engine returns a list of links. You type a query, you get ten blue results, you click one. The search engine's job is to rank pages. Your job, as a site owner, was to be the page that ranked highest.

An answer engine does something different. It reads your content, synthesizes it with other sources, and generates a response. Sometimes it cites you. Sometimes it paraphrases you. Sometimes it pulls a sentence from your page and weaves it into an answer alongside five other sites. You are not competing for a ranking position. You are competing to be a source that the model trusts enough to reference.

That changes what matters.

***

The first thing I did was look at my [structured data](https://schema.org/). Structured data is metadata embedded in your HTML — specifically [JSON-LD](https://json-ld.org/) — that tells machines who you are, what your page is about, and how your content is organized. Search engines have used it for years to generate rich snippets. Answer engines use it to build a knowledge graph about you.

My site already had a [Person](https://schema.org/Person) schema identifying me — my name, job title, employer, education, and areas of expertise. I expanded it to include all my social profiles: [LinkedIn](https://www.linkedin.com/in/juliasolorzano), [GitHub](https://github.com/juliasolorzano), and [Bluesky](https://bsky.app/profile/juliasolorzano.com). The more connections an answer engine can verify between your identity and your presence across the web, the more confidently it can attribute information to you.

I also added a [BlogPosting](https://schema.org/BlogPosting) schema to every blog post with a `description` field, and a [CollectionPage](https://schema.org/CollectionPage) with [CreativeWork](https://schema.org/CreativeWork) items for my work page. Each project is now a structured entity with a name, description, and URL. When an answer engine encounters my work page, it does not just see paragraphs of text. It sees a list of discrete projects it can reason about individually.

***

Meta descriptions sound boring. They are also one of the most important things you can control.

When an answer engine decides whether to cite your page, it often looks at the meta description first. It is the shortest, most authoritative summary of what your page contains. If you do not write one, the engine guesses — and it might guess wrong.

I audited every page on my site and found that several were missing descriptions entirely. My work page, my now page, my writing index, and all six of my recent blog posts had no `description` field in their front matter. The site's `<head>` template had a fallback to the site-wide description, but that meant every page without its own description was telling answer engines the same generic thing. I wrote unique descriptions for all of them.

***

Then there is the question of whether to let AI crawlers in at all.

Your `robots.txt` file is where you tell crawlers what they can and cannot access. A lot of publishers have been blocking AI crawlers — [GPTBot](https://platform.openai.com/docs/bots), [ClaudeBot](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), and others — because they do not want their content used to train models without compensation. [Hundreds of publishers](https://www.theregister.com/2025/12/08/publishers_say_no_ai_scrapers/) have added blocks to their `robots.txt`.

I went the other direction. My `robots.txt` explicitly welcomes every major AI crawler: GPTBot, ClaudeBot, PerplexityBot, GoogleOther, Amazonbot, and several others. This is a personal site. My goal is to be found, cited, and referenced. If an answer engine wants to read my pages and tell someone about my work, that is exactly what I want. Blocking those crawlers would be like locking the front door of a store and wondering why nobody comes in.

But this is a decision every site owner needs to make for themselves. If you publish proprietary research, original reporting, or premium content, blocking AI crawlers might protect your business model. If you are trying to build a public presence, blocking them works against you. There is no universal right answer — only your answer.

***

The last technical change was small but easy to overlook. I added a `<link rel="sitemap">` tag to my site's `<head>`. Hugo generates a sitemap automatically, and it was already referenced in my `robots.txt`, but having it linked in the HTML head makes it discoverable by any crawler that reads the page — not just the ones that check `robots.txt` first. Same for the RSS feed, which was already linked via `<link rel="alternate">`.

***

If you are thinking about AEO for your own site, here is what I would focus on:

**Start with structured data.** Add [JSON-LD](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) to your pages. At minimum, identify yourself with a Person or Organization schema. If you publish articles, add Article or BlogPosting schemas. If you have a portfolio, add CreativeWork schemas. Schema.org is the vocabulary. [Google's structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) is the best practical guide.

**Write meta descriptions for everything.** Every page. Every post. Keep them under 160 characters, make them specific, and make them accurate. This is the sentence an answer engine will use to decide if your page is worth citing.

**Decide your robots.txt policy.** Look at who is crawling you and decide whether you want them to. [Originality.ai maintains a list](https://originality.ai/ai-bot-blocking) of known AI crawlers and their User-Agent strings. You can welcome them all, block them all, or pick and choose.

**Make your content clear and well-structured.** Answer engines parse your content the same way a careful reader would. Use headings. Use short paragraphs. State your main point early. If your content is well-organized for humans, it is well-organized for machines.

**Think about entity recognition.** Answer engines are building knowledge graphs. They want to know: who wrote this, where do they work, what are they an expert in, and how does this connect to other things on the web. Your structured data, your about page, and your social profiles all feed into this. The more consistent and interconnected your identity is across the web, the more likely an answer engine is to recognize you as a credible source.

***

[SparkToro's research](https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-the-eu-its-360/) has shown that zero-click searches — where Google answers the question directly without sending you traffic — now account for a significant share of all searches. [Similarweb's data](https://searchengineland.com/google-search-zero-click-study-2024-443869) puts the number at nearly 60 percent in the United States. AI-powered answer engines accelerate that trend. The click is disappearing. What remains is the citation.

That does not mean SEO is dead. It means the game is expanding. Traditional SEO gets you ranked. AEO gets you cited. Both matter, but if you are only optimizing for one, you are leaving the other on the table.

***

I do not know exactly where this is heading. Nobody does. But I do know that the people and sites that show up in AI-generated answers are the ones that made it easy for those systems to understand who they are and what they know. That is not gaming an algorithm. That is just good communication — the kind that works whether your audience is a human or a machine.
