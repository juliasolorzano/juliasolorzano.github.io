'use strict';

var navMenu = navMenu || {};

navMenu = function () {
  var body = document.body;
  var nav = document.querySelector('nav');
  var overlay = document.getElementById('overlay');

  this.init = function () {
    document.documentElement.classList.add('menu_mobile');

    document.querySelector('.menu-btn').addEventListener('click', function () {
      body.classList.contains('menu--active') ? app.hide() : app.show();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && body.classList.contains('menu--active')) {
        app.hide();
      }
    });
  };

  this.hide = function () {
    body.classList.remove('menu--active');
    nav.classList.remove('nav--visible');
    overlay.classList.remove('overlay--visible');
  };

  this.show = function () {
    body.classList.add('menu--active');
    nav.classList.add('nav--visible');
    overlay.classList.add('overlay--visible');
  };

  this.init();
};

var app = new navMenu();
