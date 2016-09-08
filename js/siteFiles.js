/* jshint worker: true */
// We need to get the files for the site
// e.g., find . -type f \( ! -iname ".DS_Store" \) -follow -print|xargs ls -l -1
// Watch for garbage!
// watch for defaults "index.html"

"use strict";
const siteFiles = [
  "./",
  "./favicon.ico",
  "./images/backgrounds/bg_1x.jpg",
  "./images/backgrounds/bg_2x.jpg",
  "./images/backgrounds/bg_crop_2x.jpg",
  "./images/battery_icon.png",
  "./images/calendar.svg",
  "./images/document.svg",
  "./images/github.svg",
  "./images/irc.svg",
  "./images/link.svg",
  "./images/logos.jpg",
  "./images/mail.svg",
  "./images/phone.svg",
  "./images/twitter_white.svg",
  "./images/voip.svg",
  "./images/w3c_white.svg",
  "./images/webmob.svg",
  "./js/accordion.js",
  "./js/lib/async.js",
  "./js/registration.js",
  "./js/siteFiles.js",
  "./manifest.json",
  "./styles/fonts/nexa/Nexa_Bold.otf",
  "./styles/style.css",
];

