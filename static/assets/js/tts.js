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

  // Preferred voice: Tessa, falling back to system default
  var PREFERRED_VOICE = 'Tessa';

  function loadVoices() {
    var voices = speechSynthesis.getVoices();
    selectedVoice = null;
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === PREFERRED_VOICE) {
        selectedVoice = voices[i];
        break;
      }
    }
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
    utterance.lang = document.documentElement.lang || 'en';
    utterance.rate = speeds[speedIndex];

    // Apply preferred voice (Tessa if available)
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
