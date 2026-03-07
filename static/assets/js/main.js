'use strict';

// Mobile menu
var navMenu = navMenu || {};

navMenu = function () {
  var body = document.body;
  var sidebar = document.querySelector('.sidebar');
  var overlay = document.getElementById('overlay');
  var menuBtn = document.querySelector('.menu-btn');

  this.init = function () {
    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        body.classList.contains('menu--active') ? app.hide() : app.show();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', function () {
        if (body.classList.contains('menu--active')) {
          app.hide();
        }
      });
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && body.classList.contains('menu--active')) {
        app.hide();
      }
    });
  };

  this.hide = function () {
    body.classList.remove('menu--active');
    if (sidebar) sidebar.classList.remove('sidebar--visible');
    if (overlay) overlay.classList.remove('overlay--visible');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', app.trapFocus);
    if (menuBtn) menuBtn.focus();
  };

  this.show = function () {
    body.classList.add('menu--active');
    if (sidebar) sidebar.classList.add('sidebar--visible');
    if (overlay) overlay.classList.add('overlay--visible');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', app.trapFocus);
    // Focus the first link in sidebar
    var firstLink = sidebar && sidebar.querySelector('a');
    if (firstLink) firstLink.focus();
  };

  this.trapFocus = function (e) {
    if (e.key === 'Escape') {
      app.hide();
      return;
    }
    if (e.key !== 'Tab') return;

    var focusable = sidebar.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    // Include the menu button (outside sidebar) in the focus loop
    var allFocusable = [menuBtn].concat(Array.prototype.slice.call(focusable));
    var first = allFocusable[0];
    var last = allFocusable[allFocusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  this.init();
};

var app = new navMenu();

// Dark mode
(function() {
  var toggles = document.querySelectorAll('.theme-toggle');
  var root = document.documentElement;

  function isDarkMode() {
    var theme = root.getAttribute('data-theme');
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function updateToggleState() {
    var dark = isDarkMode();
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].setAttribute('aria-pressed', dark ? 'true' : 'false');
    }
  }

  function switchTheme() {
    var currentTheme = root.getAttribute('data-theme');
    var newTheme;

    if (currentTheme === 'dark') {
      newTheme = 'light';
    } else if (currentTheme === 'light') {
      newTheme = 'dark';
    } else {
      // No explicit theme set; check what the system prefers
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      newTheme = prefersDark ? 'light' : 'dark';
    }

    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleState();
  }

  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('click', switchTheme);
  }

  // Set initial state
  updateToggleState();
})();
