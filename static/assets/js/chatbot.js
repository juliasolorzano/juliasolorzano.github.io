(function () {
  'use strict';

  var messagesEl = document.getElementById('chat-messages');
  if (!messagesEl) return;

  // Make the messages container programmatically focusable so we can
  // return focus here when choice buttons are removed from the DOM.
  messagesEl.setAttribute('tabindex', '-1');

  var dataEl = document.getElementById('chatbot-data');
  if (!dataEl) return;

  var tree;
  try {
    tree = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }

  var nodes = tree.nodes;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TYPING_DELAY = reducedMotion ? 0 : 420;
  var MESSAGE_DELAY = reducedMotion ? 0 : 320;

  // ── Helpers ──────────────────────────────────────────────────

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // Visually hidden span so screen readers announce the speaker.
  function srOnly(text) {
    var span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    return span;
  }

  function createBubble(text, who) {
    var bubble = document.createElement('div');
    bubble.className = 'chat__bubble chat__bubble--' + who;
    // Prepend a visually-hidden speaker label so screen readers say
    // "Julia: Hey! Welcome…" or "You: Work experience".
    bubble.appendChild(srOnly(who === 'bot' ? 'Julia: ' : 'You: '));
    bubble.appendChild(document.createTextNode(text));
    return bubble;
  }

  function createTypingIndicator() {
    var bubble = document.createElement('div');
    bubble.className = 'chat__bubble chat__bubble--bot chat__typing';
    bubble.setAttribute('aria-label', 'Julia is typing\u2026');
    bubble.innerHTML =
      '<span aria-hidden="true"></span>' +
      '<span aria-hidden="true"></span>' +
      '<span aria-hidden="true"></span>';
    return bubble;
  }

  function removeChoices() {
    var existing = messagesEl.querySelector('.chat__choices');
    if (existing) existing.remove();
  }

  // ── Render a sequence of bot messages, then show choices ─────

  function renderNode(nodeId) {
    var node = nodes[nodeId];
    if (!node) return;

    var messages = node.messages || [];
    var choices = node.choices || [];

    function showMessage(index) {
      if (index >= messages.length) {
        if (choices.length) renderChoices(choices);
        return;
      }

      var typing = createTypingIndicator();
      messagesEl.appendChild(typing);
      scrollToBottom();

      setTimeout(function () {
        typing.remove();
        var bubble = createBubble(messages[index], 'bot');
        messagesEl.appendChild(bubble);
        scrollToBottom();

        setTimeout(function () {
          showMessage(index + 1);
        }, MESSAGE_DELAY);
      }, TYPING_DELAY + messages[index].length * 12);
    }

    showMessage(0);
  }

  function renderChoices(choices) {
    var container = document.createElement('div');
    container.className = 'chat__choices';
    // Group the buttons so screen readers announce them as a set.
    container.setAttribute('role', 'group');
    container.setAttribute('aria-label', 'Response options');

    choices.forEach(function (choice) {
      var isLink = choice.next === '__link__';
      var opensNewTab = isLink && (
        choice.url.indexOf('http') === 0 ||
        choice.url.indexOf('mailto') === 0
      );

      var btn;
      if (isLink) {
        btn = document.createElement('a');
        btn.href = choice.url;
        if (opensNewTab) {
          btn.target = '_blank';
          btn.rel = 'noopener noreferrer';
        }
      } else {
        btn = document.createElement('button');
        btn.type = 'button';
      }

      btn.className = 'chat__choice';
      btn.textContent = choice.label;

      // Tell screen reader users when a link opens in a new tab.
      if (opensNewTab) {
        btn.appendChild(srOnly(', opens in a new tab'));
      }

      if (!isLink) {
        btn.addEventListener('click', function () {
          handleChoice(choice.label, choice.next);
        });
      }

      container.appendChild(btn);
    });

    messagesEl.appendChild(container);
    scrollToBottom();

    // Move focus to the first button so keyboard users can act immediately.
    var firstBtn = container.querySelector('button.chat__choice');
    if (firstBtn) firstBtn.focus();
  }

  function handleChoice(label, nextId) {
    // Remove choices — this destroys the currently focused button.
    // Move focus to the messages container so screen reader users stay
    // oriented inside the chat before new content arrives.
    removeChoices();
    messagesEl.focus();

    // Show the user's selection as a bubble.
    var userBubble = createBubble(label, 'user');
    messagesEl.appendChild(userBubble);
    scrollToBottom();

    // Small pause before bot responds.
    setTimeout(function () {
      renderNode(nextId);
    }, reducedMotion ? 0 : 200);
  }

  // ── Boot ─────────────────────────────────────────────────────

  renderNode('start');
}());
