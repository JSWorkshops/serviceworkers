/*globals async, caches, siteFiles, Response, fetch */
"use strict";
// Let's start bringing in things we need
importScripts("js/lib/async.js");
importScripts("js/siteFiles.js");

const SITE_CACHE = "site-v1";

self.addEventListener("install", (ev) => {
  ev.waitUntil(async.task(function*() {
    const cache = yield caches.open(SITE_CACHE);
    yield cache.addAll(siteFiles);
  }));
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(async.task(function*() {
    const keys = yield caches.keys();
    const promisesToDelete = keys
      .filter(
        key => key !== SITE_CACHE && key.startsWith("site-")
      )
      .map(
        key => caches.delete(key)
      );
    yield Promise.all(promisesToDelete);
  }));
});

self.addEventListener("fetch", (ev) => {
  // Fill me in!
  ev.respondWith(async.task(function*() {
    const response = yield caches.match(ev.request);
    if (response) {
      return response;
    }
    const netResponse = yield fetch(ev.request);
    if (netResponse.status === 404 && ev.request.url.endsWith(".html")) {
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
  switch (data.action) {
    case "skipWaiting":
      self.skipWaiting();
      break;
  }
});
