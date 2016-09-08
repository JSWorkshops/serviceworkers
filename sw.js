/*globals async, caches, siteFiles, Response, fetch */
"use strict";
// Let's start bringing in things we need
importScripts("js/lib/async.js");
importScripts("js/siteFiles.js");

console.info("Hello, I'm the service worker!");

const SITE_CACHE = "site-v3";

// Let's set up life cycle listeners ("install", "activate", "fetch")
self.addEventListener("install", (ev) => {
  // Fill me in!
  ev.waitUntil(async.task(function*() {
    const cache = yield caches.open(SITE_CACHE);
    yield cache.addAll(siteFiles);
    console.log("Done adding site files");
  }));
});

self.addEventListener("activate", () => {
  // fill me in
  //delete old caches
  async.task(function*(){
    const keys = yield caches.keys();
    yield keys
      .filter(key => key !== SITE_CACHE && key.startsWith("site-"))
      .map(key => caches.delete(key));
  });
});

self.addEventListener("fetch", (ev) => {
  // Fill me in!
  ev.respondWith(async.task(function*() {
    const response = yield caches.match(ev.request);
    if (response) {
      return response;
    }
    const netResponse = yield fetch(ev.request);
    if (netResponse.status === 404) {
      return new Response(`
        <h1>Oh Noes!</h1>
        <p>Back to <a href="/">index</a></p>
        `, {
        headers: {
          "Content-Type": "text/html"
        }
      });
    }
    return netResponse;
  }));
});

self.addEventListener("message", ({ data }) => {
  // Fill me in!
  console.log("SW Message", data);
  switch (data.action) {
    case "skipWaiting":
      self.skipWaiting();
      break;
  }
});
