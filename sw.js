/*globals async, caches, siteFiles, Response, fetch */
"use strict";
// Let's start bringing in things we need
importScripts("js/lib/async.js");

console.info("Hello, I'm the service worker!");

const SITE_CACHE = "site-v1";

// Let's set up life cycle listeners ("install", "activate", "fetch")
self.addEventListener("install", (ev) => {
  // Fill me in!
});

self.addEventListener("activate", () => {
  // fill me in
});

self.addEventListener("fetch", (ev) => {
  // Fill me in!
});

self.addEventListener("message", ({ data }) => {
  // Fill me in!
});
