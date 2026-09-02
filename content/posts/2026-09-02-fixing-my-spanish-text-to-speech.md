---
date: 2026-09-02
slug: fixing-my-spanish-text-to-speech
title: "My Spanish Writings Had a South African Accent"
description: "For five months, every Spanish post on this site was read aloud by an English voice sounding out Spanish spelling phonetically. Here is the one-line bug behind it, why the Web Speech API makes it so easy to write, and what proper dialect support actually requires."
image: /assets/images/og-fixing-my-spanish-text-to-speech.png
---

*In March I [added a text-to-speech player](/blog/2026/03/19/adding-text-to-speech/) to this site so anyone could listen to my writings instead of reading them. Last week I pressed play on one of the Spanish versions and heard something that made me wince. This is about the bug, the fix, and the uncomfortable thing it taught me about testing a bilingual site.*

***

The player had been live for five months. I was happy with it. It worked, it was accessible, it had passed a real audit — screen reader semantics, touch targets, color contrast, all of it.

Then I opened the Spanish version of one of my own writings and pressed play.

What came out was not Spanish. It was recognizably Spanish *words*, but pronounced as if someone had handed the text to a person who had never seen the language and asked them to read it out loud using English rules. The double L in *llegar* came out as an English L. The J in *trabajo* was an English J, not the throaty H it should be. Every vowel was wrong — Spanish vowels are pure and short, and these were the long, sliding diphthongs of English. It sounded like a tourist reading a menu.

I knew immediately that it was my fault. I just did not yet know how.

***

Here is the bug, and it is one line.

When I built the player in March, I tested a few dozen voices and settled on one called Tessa. She was warm and even-paced and did not sound like a GPS unit. So I set her as the preferred voice:

```js
var PREFERRED_VOICE = 'Tessa';
```

Tessa is an **en-ZA** voice. South African English.

That line applied on every page of the site. Every page, in both languages. The Spanish writings were being read by a South African English voice, phonetically sounding out Spanish spelling.

The part that makes this a genuinely easy mistake is what happens next. Further down, the code did this:

```js
utterance.lang = document.documentElement.lang || 'en';  // 'es' on Spanish pages
utterance.voice = selectedVoice;                          // Tessa, en-ZA
```

That looks defensive. It looks like the `lang` line is doing something. It is not.

**In the Web Speech API, `utterance.voice` completely overrides `utterance.lang`.** Once you assign a voice, the language hint is dead. It is not a fallback, it is not a hint, it is not consulted for pronunciation. A voice *is* a language — the phoneme set and the pronunciation rules are baked into it. You cannot ask an English voice to speak Spanish any more than you can ask a violin to sound like a trumpet by labeling it differently.

So the `lang = 'es'` line was pure decoration. I had written it in March, seen it there, and read it ever since as "handles the Spanish case." It handled nothing.

***

There was a second, quieter problem underneath.

My `<html lang>` attribute emits `es` — just the language, no region. Even with the Tessa bug fixed, a bare `es` typically resolves to Castilian Spanish. On macOS that means Mónica: a lovely voice, and the wrong one for me. Castilian has the *theta* — *gracias* comes out as *grathias* — and a prosody that is unmistakably from Spain.

I write in Mexican Spanish. My mother is from Guadalajara. Having my writings read back to me in a Spanish that is not the one I actually speak is a smaller wound than the English-accent bug, but it is the same wound.

The fix is to use full **BCP-47** tags with the region attached. Not `es` but `es-MX`. Not `en` but `en-US`. I already had these in my Hugo config and had simply never plumbed them through:

```toml
[languages.es]
  languageCode = "es-MX"
```

The player partial now carries that value into the markup, and the JavaScript reads it from there.

***

The rewritten voice selection follows one rule above all others: **a voice is only ever chosen from the page's own language.** If nothing matches, it assigns no voice at all and lets the browser resolve from `lang` — a browser-picked voice in the right language beats a hand-picked voice in the wrong one, every time.

Beyond that it ranks candidates: a named preference first, then an exact regional match (`es-MX` over `es-ES`), then any voice in the right language.

The named-preference step is what let me keep Tessa. She is still the English default, because I still like her — the preference is just scoped to English now instead of applying to the entire site. Spanish gets Paulina, who is `es-MX`.

The voice names worth knowing, if you are doing this yourself:

- **macOS and iOS** — Paulina (es-MX), Mónica (es-ES), Jorge (es-ES), Diego (es-AR)
- **Chrome** — "Google español de Estados Unidos" is es-US and is your best Latin American option. Chrome ships no Google es-MX voice at all.
- **Windows and Edge** — Sabina and Raúl are es-MX, Dalia appears in the newer Natural voice set, Helena and Laura are es-ES

I match these as case-insensitive substrings, with accents stripped, so *Mónica* and *Monica* both hit.

***

There is one more lever, and it turned out to be the biggest one for quality.

On macOS, the Paulina that ships by default is the **compact** voice. That is the thin, buzzy, GPS-from-2012 sound. There are Enhanced and Premium variants of the same voice that are dramatically better, and they are not installed unless you go and get them, under *System Settings → Accessibility → Spoken Content → System Voice → Manage Voices*.

The selection now ranks Premium above Enhanced above compact within a matched name, so if a listener has the better files installed, they get used automatically without anyone configuring anything.

Two limits worth being honest about. Siri voices — the genuinely good ones — are not exposed to the Web Speech API at all, so they are simply off the table. And every listener only gets what is installed on their own machine. I cannot ship a voice with a static site. If I ever decide that Spanish audio quality must be *guaranteed* rather than *hoped for*, the answer is pre-rendering audio files with a neural TTS provider at build time, which is a different and much heavier project.

There is also a limitation I have not fixed. The player flattens each writing into a single string, so a Spanish post that quotes English gets the whole thing in one voice. Doing that properly means segmenting the text by language and chaining separate utterances. It is real work, not a tweak, and I left it alone for now.

***

I verified both languages in a browser before calling it done, by intercepting the actual utterance at the moment of playback rather than trusting that the code looked right:

| Page | Language | Voice |
|---|---|---|
| English writing | `en-US` | Tessa (en-ZA) |
| Spanish writing | `es-MX` | **Paulina (es-MX)** |

All nineteen of the [Playwright tests I wrote in March](/blog/2026/03/25/testing-the-foundation/) still pass. None of them caught this, which is worth sitting with — they check that the player *exists*, that its ARIA attributes are correct, that the progress bar reports the right values. Not one of them checks which voice comes out. The tests were watching the shape of the thing, not the sound of it.

***

The part I keep turning over is not the bug. One-line bugs are ordinary. It is that I shipped an accessibility feature that was broken for half my readers and did not notice for five months.

I did not notice because I never listened in Spanish. I built the feature in English, tested it in English, and wrote about it in English. The Spanish version got the same code and none of the same attention. Every time I demoed the player to someone, I demoed the English one.

That is the specific failure mode of a bilingual site built by one person: the second language inherits the code but not the scrutiny. The bug was not that I made the site bilingual carelessly — I translated every writing myself, by hand, because I did not want a machine speaking for me. The bug was that I treated the Spanish side as a *translation* of the English side rather than as its own thing that could break on its own terms.

An accessibility feature that only works in one of your two languages is not an accessibility feature. It is an accessibility feature for the readers you were already thinking about.

I fixed it in an afternoon, working alongside Claude — I described the symptom, we found the line, and the verification step of actually capturing the live utterance was what turned "this looks right" into "this is right." That last part mattered more than the fix. I had been reading that `lang` line for five months and seeing what I expected to see.

***

You can try it. Open any writing on this site in Spanish and press play. If you have Paulina, you will hear her, and she will sound like she is actually reading Spanish.

If she still sounds like a GPS, go download the Enhanced voice. It is worth the four minutes.
