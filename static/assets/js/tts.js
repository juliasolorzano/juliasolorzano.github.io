(function () {
  'use strict';

  if (!('speechSynthesis' in window)) return;

  var player = document.querySelector('.tts-player');
  if (!player) return;

  // Show the player now that we know TTS is supported
  player.removeAttribute('hidden');

  var playBtn = player.querySelector('.tts-player__play');
  var stopBtn = player.querySelector('.tts-player__stop');
  var speedBtn = player.querySelector('.tts-player__speed');
  var label = player.querySelector('.tts-player__label');
  var progressWrap = player.querySelector('.tts-player__progress');
  var progressBar = player.querySelector('.tts-player__progress-bar');
  var playIcon = player.querySelector('.tts-player__icon--play');
  var pauseIcon = player.querySelector('.tts-player__icon--pause');
  var srStatus = player.querySelector('.tts-player__sr-status');
  var selectedVoice = null;

  // SVG elements don't reliably reflect .hidden as an attribute
  function hide(el) { el.setAttribute('hidden', ''); }
  function show(el) { el.removeAttribute('hidden'); }
  function announce(msg) { if (srStatus) srStatus.textContent = msg; }

  var state = 'idle'; // idle | playing | paused
  var startTime = 0;
  var elapsed = 0;
  var estimatedDuration = 0;
  var timer = null;
  var speeds = [1, 1.25, 1.5, 2];
  var speedIndex = 0;
  var generation = 0;

  // Average speech rate: ~150 words per minute at 1x speed
  var WORDS_PER_MINUTE = 150;

  // i18n labels from data attributes or fallback
  var labels = {
    listen: label.textContent.trim(),
    pause: player.dataset.pause || 'Pause',
    resume: player.dataset.resume || 'Resume',
    playing: player.dataset.playing || 'Playing',
    stop: player.dataset.stop || 'Stop'
  };

  // Full BCP-47 tag for this page (en-US, es-MX) so the browser picks the
  // right regional pronunciation, not just the right language.
  var pageLang = player.dataset.lang || document.documentElement.lang || 'en';
  var baseLang = pageLang.split(/[-_]/)[0].toLowerCase();

  // Preferred voice names per language, best first. Matched as a
  // case-insensitive substring so "(Enhanced)" and "(Premium)" variants win
  // over the plain ones. A voice is only ever chosen from the page's own
  // language -- a mismatched voice mangles pronunciation entirely, since
  // utterance.voice overrides utterance.lang.
  var PREFERRED_VOICES = {
    en: ['Tessa', 'Samantha', 'Google US English'],
    es: ['Paulina', 'Sabina', 'Dalia', 'espanol de Estados Unidos', 'Google espanol']
  };

  function langMatches(voice) {
    return String(voice.lang || '').split(/[-_]/)[0].toLowerCase() === baseLang;
  }

  function regionMatches(voice) {
    return String(voice.lang || '').replace('_', '-').toLowerCase() === pageLang.toLowerCase();
  }

  // Strip accents so 'Mónica'/'Monica' and 'español'/'espanol' both match
  function normalize(str) {
    return str.normalize ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : str.toLowerCase();
  }

  function loadVoices() {
    var all = speechSynthesis.getVoices();
    var candidates = [];
    var i;

    for (i = 0; i < all.length; i++) {
      if (langMatches(all[i])) candidates.push(all[i]);
    }

    selectedVoice = null;
    if (!candidates.length) return; // Let the browser pick from utterance.lang

    // 1. A named preference for this language, best-ranked first. Within one
    // name, take the highest quality tier available -- on macOS the plain
    // voice is the compact one, and Premium/Enhanced sound markedly better.
    var preferred = PREFERRED_VOICES[baseLang] || [];
    for (i = 0; i < preferred.length && !selectedVoice; i++) {
      var want = normalize(preferred[i]);
      var bestTier = -1;
      for (var j = 0; j < candidates.length; j++) {
        var name = normalize(candidates[j].name);
        if (name.indexOf(want) === -1) continue;
        var tier = name.indexOf('premium') !== -1 ? 2 : (name.indexOf('enhanced') !== -1 ? 1 : 0);
        if (tier > bestTier) {
          bestTier = tier;
          selectedVoice = candidates[j];
        }
      }
    }

    // 2. Otherwise an exact regional match (es-MX over es-ES)
    for (i = 0; i < candidates.length && !selectedVoice; i++) {
      if (regionMatches(candidates[i])) selectedVoice = candidates[i];
    }

    // 3. Otherwise any voice in the right language
    if (!selectedVoice) selectedVoice = candidates[0];
  }

  // Voices load asynchronously in some browsers
  loadVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }

  function getPostText() {
    var content = document.querySelector('.post__content');
    if (!content) return '';

    // Clone to avoid modifying the DOM
    var clone = content.cloneNode(true);

    // Remove code blocks, images, and figures
    var remove = clone.querySelectorAll('pre, code, img, figure, figcaption, .highlight, script, style');
    for (var i = 0; i < remove.length; i++) {
      remove[i].remove();
    }

    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function updateProgress() {
    if (estimatedDuration <= 0) return;
    var pct = Math.min((elapsed / estimatedDuration) * 100, 100);
    progressBar.style.width = pct + '%';
    progressBar.setAttribute('aria-valuenow', Math.round(pct));
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    startTime = Date.now() - (elapsed * 1000);
    timer = setInterval(function () {
      elapsed = (Date.now() - startTime) / 1000;
      updateProgress();
    }, 250);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function setPlaying() {
    state = 'playing';
    hide(playIcon);
    show(pauseIcon);
    label.textContent = labels.pause;
    playBtn.setAttribute('aria-label', labels.pause);
    show(stopBtn);
    show(speedBtn);
    show(progressWrap);
    startTimer();
    announce(labels.playing);
  }

  function setPaused() {
    state = 'paused';
    show(playIcon);
    hide(pauseIcon);
    label.textContent = labels.resume;
    playBtn.setAttribute('aria-label', labels.resume);
    stopTimer();
    announce(labels.pause);
  }

  function setIdle() {
    state = 'idle';
    show(playIcon);
    hide(pauseIcon);
    label.textContent = labels.listen;
    playBtn.setAttribute('aria-label', labels.listen);
    hide(stopBtn);
    hide(speedBtn);
    hide(progressWrap);
    stopTimer();
    announce(labels.stop);
    elapsed = 0;
    progressBar.style.width = '0%';
    progressBar.setAttribute('aria-valuenow', '0');
    speedIndex = 0;
    speedBtn.textContent = '1x';
  }

  function speak() {
    var text = getPostText();
    if (!text) return;

    var wordCount = text.split(/\s+/).length;
    estimatedDuration = (wordCount / WORDS_PER_MINUTE) * 60 / speeds[speedIndex];

    var gen = ++generation;
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = pageLang;
    utterance.rate = speeds[speedIndex];

    // Apply the language-matched voice, if we found one
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = function () {
      if (generation === gen) {
        progressBar.style.width = '100%';
        setIdle();
      }
    };

    utterance.onerror = function (e) {
      if (e.error !== 'canceled' && generation === gen) {
        setIdle();
      }
    };

    speechSynthesis.speak(utterance);
    setPlaying();
  }

  playBtn.addEventListener('click', function () {
    if (state === 'idle') {
      speechSynthesis.cancel();
      speak();
    } else if (state === 'playing') {
      speechSynthesis.pause();
      setPaused();
    } else if (state === 'paused') {
      speechSynthesis.resume();
      setPlaying();
    }
  });

  speedBtn.addEventListener('click', function () {
    speedIndex = (speedIndex + 1) % speeds.length;
    speedBtn.textContent = speeds[speedIndex] + 'x';

    if (state === 'playing' || state === 'paused') {
      elapsed = 0;
      speechSynthesis.cancel();
      speak();
    }
  });

  stopBtn.addEventListener('click', function () {
    generation++;
    speechSynthesis.cancel();
    setIdle();
  });

  window.addEventListener('beforeunload', function () {
    speechSynthesis.cancel();
  });
})();
