---
date: 2026-04-30
slug: care-is-not-a-feature-flag
title: "Care Is Not a Feature Flag"
description: "A response to Nilay Patel's 'software brain' essay — why the chatbot I shipped last week has no LLM, and what I think people actually yearn for when they say they are tired of AI."
image: /assets/images/og-care-is-not-a-feature-flag.png
---

*I read a piece this week that gave language to something I had been circling for a while. Nilay Patel's [The People Do Not Yearn for Automation](https://www.theverge.com/podcast/917029/software-brain-ai-backlash-databases-automation) makes the case that the tech industry has what he calls* software brain *— a way of seeing the world as a series of databases that can be controlled with structured code. He argues that AI has not earned the public's trust because people are reacting to their lived experience of it, not to its marketing. I have been thinking about that ever since and how I relate to this notion of software brain.*

***

Patel's argument is direct. Software brain works for businesses — collecting data, analyzing it, taking action on it in a loop — but it fails the moment you try to apply it to people. Governments are not software. Courts are not computers. Most of life is not a database, and the more the AI industry asks people to flatten themselves into one, the more people pull away. "Computers should adapt to people," he writes. "Asking people to make themselves more legible to software — to turn themselves into a database — is a doomed idea."

He is right. And the polling backs him up: every recent survey of Gen Z attitudes toward AI shows the same thing — high usage, growing dislike. You cannot market your way out of how something feels to use.

***

I noticed myself reading the piece through the lens of work I had just shipped. A few weeks ago I [added a chatbot to this site](/blog/2026/04/17/portfolio-chatbot/). On the surface, the framing sounds like exactly the move Patel is critiquing: take a portfolio — twenty years of design and engineering and government work — and turn it into something you can query. Flatten the career into a thing the visitor can ask questions of. The portfolio as conversation.

Except the chatbot has no language model. There is no API, no inference, no machine learning, no training data, no telemetry. The entire conversation is a guided decision tree I wrote, sitting in a YAML file that Hugo serializes into the page at build time. The interaction model borrows from the moment we are in. The substance refuses it.

I did not think of it that way when I built it. I built it because a guided conversation seemed like a clearer way to introduce my work than a sidebar menu. But Patel's piece made me think. The shape of an interaction can exist without the substrate underneath it. You can borrow the *feeling* of conversation without asking the visitor to feed a model in exchange for an answer.

***

That distinction is not a flex. It is the whole point of why these tools feel different from the inside.

When you talk to a real chatbot built on a hosted LLM, something is happening on the other end. Your words are going somewhere. They are being logged, analyzed, possibly retained, possibly used to train the next version of the model. You are doing two things at once: asking a question and feeding a system. Even when the answers are useful, the transaction is asymmetrical.

The decision tree on my site does none of that. Nothing about the visitor is collected. There is no other end. The "data" is twenty years of my own career, organized by me, in language I chose, in two languages I speak. The visitor is not making themselves legible to anything. They are reading a thing I wrote, in the order they want to read it. That is closer to a book with a table of contents than to an AI agent. It just happens to look like a chat window.

I think this is what Patel is gesturing at when he says people do not yearn for automation. They do not mind a conversation. They mind being read.

***

You can pull the same thread through the rest of the site. [Accessibility](/blog/2026/03/15/accessibility-is-the-foundation/) is a refusal to make the user adapt to the interface — focus management, semantic HTML, reduced motion, screen reader support, dark mode. The site adapts to the human. Not the other way around.

Now about translations. Every post on this site has an English file and a Spanish file, and the Spanish is not run through a translation API. The [test suite](/blog/2026/03/25/testing-the-foundation/) checks that translation parity holds — every post must exist in both languages — but the *quality* and *dialect* (Mexico) of the Spanish is a thing only a human can guarantee.

These choices cost more than the automated alternatives. That cost is the care. People can feel the difference, even when they cannot name it. A reader who lands on a translated post and notices it sounds like a person wrote it — that is not a UX win. That is the absence of an extraction.

***

The phrase I keep coming back to from Ezra Klein, quoted in Patel's piece, is *making themselves legible to the A.I.* That is the ask underneath every "connect your accounts" prompt, every "let me read your inbox" agent demo, every persistent-memory feature being shipped right now. It is not exactly surveillance and it is not exactly convenience. It is a request that you reformat yourself so a model can act on you.

I do not want to do that. I do not want to ask you (dear reader) to do that either. There are versions of AI I find genuinely useful — I used AI tooling while [rebuilding this site](/blog/2026/03/17/rebuilding-my-site/), and I have been [pragmatic about discovery shifting](/blog/2026/03/16/answer-engine-optimization/) toward answer engines. I am not the person writing the takedown. But there is a difference between a tool I reach for and a system I am asked to feed, and the second one is what people are reacting to.

***

Patel says the people do not yearn for automation. I think that is true, and I would extend it. What people do yearn for is evidence that someone made a choice on their behalf. A curated path. A translation that was thought about. An interface that respects their attention. A response that came from a person.

Care is not a feature flag. You cannot ship it on a roadmap. You cannot A/B test your way to it. It shows up in the small stuff — in what you decided not to automate, in the languages you chose to write yourself, in the decision tree you wrote by hand because you wanted the visitor to be welcomed by you and not by a model trained on a million other people's voices.

That is the version of this work I want to keep doing.

***

If you have not read [Patel's piece](https://www.theverge.com/podcast/917029/software-brain-ai-backlash-databases-automation), it is worth your time. And if you want to see what I mean about the chatbot, it is still at [/chat](/chat/), pre-scripted, no model, no logs, just me.
