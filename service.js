'use strict'
var DEBUG = true;

if (!self.debug) {
  self.debug = function debug(message) {
    dump('Execution context: ' + message + '\n');
  };
}

self.addEventListener('install', function(evt) {
  if (DEBUG) {
    debug('install event fired!');
  }

  function delaysAsInstalled() {
    if (DEBUG) {
      debug('delaying treating the installing worker as installed!');
    }
    return Promise.resolve();
  }
  evt.waitUntil(delaysAsInstalled());
  // evt.waitUntil(
  //   caches.open('v1').then(function(cache) {
  //     debug('caching image into cache');
  //     return cache.addAll([
  //       '/',
  //       '/js/app.js',
  //       '/img/mozilla.png']);
  //   })
  // );
});

self.addEventListener('activate', function(evt) {
  if (DEBUG) {
    debug('activate event fired!');
  }
  function delaysAsActivated() {
    if (DEBUG) {
      debug('delaying treating the installing worker as activated!');
    }
    return Promise.resolve();
  }
  evt.waitUntil(delaysAsActivated());
});

self.addEventListener('fetch', function(evt) {
  var request = evt.request;
  var url = new URL(request.url);
  
  if (DEBUG) {
    debug('fetching ' + url.pathname);
  }

  evt.respondWith(
    fetch(request)
    // caches.open('v1').then(function(cache) {
    //   return cache.match(request).then(function(response) {
    //     if (response) {
    //       debug('found response in cache: ' + response);
    //       return response;
    //     } else {
    //       debug('no response found in cache. Fetching from network');
    //       return fetch(request);
    //     }
    //   }, function(error) {
    //     debug('error in cache.match ' + error);
    //   });
    // }, function(error) { debug('error in caches.open ' + error); })
  );
});
