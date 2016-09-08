/* jshint worker: true */
/*globals async, caches, siteFiles, Response, fetch */
"use strict";

// Let's start bringing in things we need
importScripts("js/lib/async.js");
importScripts("js/siteFiles.js");

console.info("Hello, I'm the service worker!");

const SITE_CACHE = "v1";

// Set up Service Worker tasks
const SWTasks = {
  cacheSite: async(function*(siteFiles, cacheName) {
    console.info("Trying to off-line site resources into:", cacheName);
    try {
      const cache = yield caches.open(cacheName);
      yield cache.addAll(siteFiles);
    } catch (err) {
      throw err;
    }
    console.log("Success! done caching site files!");
  }),
  networkFirst(request, cacheName) {
    return async.task(function*() {
      let response;
      try {
        response = yield fetch(request);
        if (!response.ok) {
          throw new Error("Got response, but was not ok!", response.status);
        }
      } catch (err) {
        console.warn("Useless response, going to cache:", err);
        return yield this.respondFromCache(request, cacheName);
      }
      // Response was ok, so let's cache it!
      try {
        yield this.saveToCache(request, response, cacheName);
      } catch (err) {
        console.error("Oh crap! Wasn't able to write to cache!", err);
      }
      return response;
    }, this);
  },
  deleteAllCaches: async(function*() {
    const keys = yield caches.keys();
    const promisesToDelete = keys.map(
      key => caches.delete(key)
    );
    yield Promise.all(promisesToDelete);
  }),
  respondFromCache: async(function*(request, cacheName) {
    const cache = yield caches.open(cacheName);
    let response = yield cache.match(request);
    // We have this, yay!
    if (response) {
      return response;
    }
    // Try to get it from the network and store it
    try {
      console.warn("Not in cache. Getting from network:", request.url || request);
      const response = yield fetch(request);
      yield cache.put(request, response.clone());
    } catch (err) {
      var msg = `failed to store ${request.url || request} in ${cacheName}.`;
      console.warn(msg, err);
      // ensure a response
      response = new Response();
    }
    return response;
  }),
  saveToCache: async(function*(request, response, cacheName) {
    const cache = yield caches.open(cacheName);
    yield cache.put(request, response.clone());
  }),
};

// Let's set up life cycle listeners ("install", "activate", "fetch")
self.addEventListener("install", (ev) => {
  ev.waitUntil(self.skipWaiting());
  async.task(function*() {
      yield SWTasks.deleteAllCaches();
      yield SWTasks.cacheSite(siteFiles, SITE_CACHE);
      console.info("Successfully completed install tasks...");
    })
    .catch(
      err => console.error("Caching went horribly wrong", err)
    );
});

self.addEventListener("activate", (ev) => {
  console.info("Service Worker activated");
  ev.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (ev) => {
  console.info("Handling", ev.request.url, "going to network first...");
  ev.respondWith(SWTasks.networkFirst(ev.request, SITE_CACHE));
});
