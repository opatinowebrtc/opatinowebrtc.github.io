'use strict';

var DEBUG = true;

if (!self.debug) {
  self.debug = function debug(message) {
    dump("Execution context: " + message + "\n");
  };
}

self.addEventListener('install', evt => {
  if (DEBUG) {
    debug('install event fired!');
  }

  function delaysAsInstalled() {
    if (DEBUG) {
      debug('delaying treating the installing worker as installed!');
    }
    return Promise.resolve();
  }
  evt.waitUntil(
    caches.open('v1').then(function(cache) {
      debug('caching image into cache');
      return cache.addAll([
        '/',
        '/css/app.css',
        '/js/app.js',
        '/img/mozilla.png']);
      // cache.add('/').then(reponse => { debug('added /'); });
      // cache.add('/css/app.css').then(reponse => { debug('added /css/app.css'); });
      // cache.add('/js/app.js').then(reponse => { debug('added /js/app.js'); });
      // return cache.add('/img/mozilla.png');
    })
  );
});

self.addEventListener('activate', evt => {
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

self.addEventListener('fetch', evt => {
  var request = evt.request;
  var url = new URL(request.url);
  
  if (DEBUG) {
    debug('fetching ' + url.pathname);
  }

  evt.respondWith(
    caches.open('v1').then(function(cache) {
      return cache.matchAll('/').then(response => {
        debug(response);
        // response.map(function(r){
        //   debug('MatchAll responded cache match ' + r);
        //   return r;
      // return cache.match(request).then(function(response) {
      //   if (response) {
      //     url = new URL(response.url);
      //     debug('found response in cache: ' + url.pathname);
      //     // if(url.pathname === '/img/mozilla2.png') {
      //     //   cache.delete('/img/mozilla2.png').then(response => {
      //     //   debug('delete works, deleted mozilla2.png');
      //     // });
      //     debug('testing keys...');
      //     //cache.keys('/').then(reponse => {
      //     //  debug('keys response: ' + JSON.stringify(reponse));
      //     // });
      //     // return response;
      //   } else {
      //     var reqURL = new URL(request.url);
      //     debug('no response found in cache. Fetching from network ' + reqURL);

      //       // fetch(request).then(response => {
      //       //   var response2 = response;
      //       //   cache.put(request, response2).then( response3 => {
      //       //     debug('cache put works, put mozilla2.png in cache');
      //       //   });
      //       // });

      //     // return fetch(request);
      //   }
      }, function(error) {
        debug('error in cache.match ' + error);
      });
    }, function(error) { debug('error in caches.open ' + error); })
  );
});

self.addEventListener('message', evt => {
  caches.open('v1').then( cache => {
    var url = evt.data.url;
    switch (evt.data.command) {
      case 'delete':
        cache.delete(url).then(response => {
          debug('deleted ' + url + '\n');
        });
        break;
      case 'put':
        cache.put(url).then(response => {
          debug('put ' + url + '\n');
        });
        break;
      case 'add':
        cache.add(url).then( response => {
          debug('added ' + url + '\n');
        });
        break;
    }
  });
});

// 'use strict';
// var DEBUG = true;

// if (!self.debug) {
//   self.debug = function debug(message) {
//     dump('Execution context: ' + message + '\n');
//   };
// }

// self.addEventListener('install', function(evt) {
//   if (DEBUG) {
//     debug('install event fired!');
//   }

//   function delaysAsInstalled() {
//     if (DEBUG) {
//       debug('delaying treating the installing worker as installed!');
//     }
//     return Promise.resolve();
//   }
//   evt.waitUntil(delaysAsInstalled());
//   // evt.waitUntil(
//   //   caches.open('v1').then(function(cache) {
//   //     debug('caching image into cache');
//   //     return cache.addAll([
//   //       '/',
//   //       '/js/app.js',
//   //       '/img/mozilla.png']);
//   //   })
//   // );
// });

// self.addEventListener('activate', function(evt) {
//   if (DEBUG) {
//     debug('activate event fired!');
//   }
//   function delaysAsActivated() {
//     if (DEBUG) {
//       debug('delaying treating the installing worker as activated!');
//     }
//     return Promise.resolve();
//   }
//   evt.waitUntil(delaysAsActivated());
// });

// self.addEventListener('fetch', function(evt) {
//   var request = evt.request;
//   var url = new URL(request.url);
  
//   if (DEBUG) {
//     debug('fetching ' + url.pathname);
//   }

//   evt.respondWith(
//     fetch(request)
//     // caches.open('v1').then(function(cache) {
//     //   return cache.match(request).then(function(response) {
//     //     if (response) {
//     //       debug('found response in cache: ' + response);
//     //       return response;
//     //     } else {
//     //       debug('no response found in cache. Fetching from network');
//     //       return fetch(request);
//     //     }
//     //   }, function(error) {
//     //     debug('error in cache.match ' + error);
//     //   });
//     // }, function(error) { debug('error in caches.open ' + error); })
//   );
// });
