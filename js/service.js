
// 'use strict';

// var DEBUG = true;

// if (!self.debug) {
//   self.debug = function debug(message) {
//     dump("Execution context: " + message + "\n");
//   };
// }

// self.addEventListener('install', evt => {
//   if (DEBUG) {
//     debug('install event fired!');
//   }

//   function delaysAsInstalled() {
//     if (DEBUG) {
//       debug('delaying treating the installing worker as installed!');
//     }
//     return Promise.resolve();
//   }
//   evt.waitUntil(
//     caches.open('v1').then(function(cache) {
//       debug('caching image into cache');
//       return cache.addAll([
//         '/',
//         '/css/app.css',
//         '/js/app.js',
//         '/img/mozilla.png']);
//       // cache.add('/').then(reponse => { debug('added /'); });
//       // cache.add('/css/app.css').then(reponse => { debug('added /css/app.css'); });
//       // cache.add('/js/app.js').then(reponse => { debug('added /js/app.js'); });
//       // return cache.add('/img/mozilla.png');
//     })
//   );
// });

// self.addEventListener('activate', evt => {
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

// // self.addEventListener('fetch', evt => {
// //   var request = evt.request;
// //   var url = new URL(request.url);
  
// //   if (DEBUG) {
// //     debug('fetching ' + url.pathname);
// //   }

// //   evt.respondWith(
// //     caches.open('v1').then(function(cache) {
// //       return cache.matchAll(request).then(response => {
// //         debug(JSON.stringify(response));
// //         response.map(function(r){
// //           debug('MatchAll responded cache match ' + r);
// //           return r;
// //       return cache.match(request).then(function(response) {
// //         if (response) {
// //           url = new URL(response.url);
// //           debug('found response in cache: ' + url.pathname);
// //           if(url.pathname === '/img/mozilla2.png') {
// //             cache.delete('/img/mozilla2.png').then(response => {
// //             debug('delete works, deleted mozilla2.png');
// //           });
// //           debug('testing keys...');
// //           cache.keys('/').then(reponse => {
// //            debug('keys response: ' + JSON.stringify(reponse));
// //           });
// //           return response;
// //         } else {
// //           var reqURL = new URL(request.url);
// //           debug('no response found in cache. Fetching from network ' + reqURL);

// //             fetch(request).then(response => {
// //               var response2 = response;
// //               cache.put(request, response2).then( response3 => {
// //                 debug('cache put works, put mozilla2.png in cache');
// //               });
// //             });

// //           // return fetch(request);
// //         }
// //       }, function(error) {
// //         debug('error in cache.match ' + error);
// //       });
// //     }, function(error) { debug('error in caches.open ' + error); })
// //   );
// // });


// self.addEventListener('fetch', evt => {
//   var request = evt.request;
//   var url = new URL(request.url);
  
//   if (DEBUG) {
//     debug('fetching ' + url.pathname);
//   }

//   evt.respondWith(

//     // caches.open('v1').then(cache => {
//     //   debug('cache created or recovered ' + cache);
//     //   caches.open('v2').then(result => {
//     //     debug('cache created or recovered ' + cache);
//     //     caches.open('v3').then(result => {
//     //       debug('cache created or recovered ' + cache);
//     //       caches.keys().then(arrayCaches => {
//     //         arrayCaches.map(cache => {
//     //           debug('cache en caches: ' + cache);
//     //           caches.match(request).then(response => {
//     //             debug('caches.match response found in a cache ' + response);
//     //             return response;
//     //           });
//     //         });
//     //       });
//     //     });

//     caches.open('v1').then(function(cache) {
//       return cache.matchAll().then(response => {
//         response.map(resp => {
//           debug(resp.url);
//         });
//         // response.map(function(r){
//         //   debug('MatchAll responded cache match ' + r);
//         //   return r;
//       // return cache.match(request).then(function(response) {
//       //   if (response) {
//       //     url = new URL(response.url);
//       //     debug('found response in cache: ' + url.pathname);
//       //     // if(url.pathname === '/img/mozilla2.png') {
//       //     //   cache.delete('/img/mozilla2.png').then(response => {
//       //     //   debug('delete works, deleted mozilla2.png');
//       //     // });
//       //     debug('testing keys...');
//       //     //cache.keys('/').then(reponse => {
//       //     //  debug('keys response: ' + JSON.stringify(reponse));
//       //     // });
//       //     // return response;
//       //   } else {
//       //     var reqURL = new URL(request.url);
//       //     debug('no response found in cache. Fetching from network ' + reqURL);

//       //       // fetch(request).then(response => {
//       //       //   var response2 = response;
//       //       //   cache.put(request, response2).then( response3 => {
//       //       //     debug('cache put works, put mozilla2.png in cache');
//       //       //   });
//       //       // });

//       //     // return fetch(request);
//       //   }
//       }, function(error) {
//         debug('error in cache.match ' + error);
//       });
//     })
//   );
// });

// self.addEventListener('message', evt => {
//   caches.open('v1').then( cache => {
//     var url = evt.data.url;
//     switch (evt.data.command) {
//       case 'delete':
//         cache.delete(url).then(response => {
//           debug('deleted ' + url + '\n');
//         });
//         break;
//       case 'put':
//         cache.put(url).then(response => {
//           debug('put ' + url + '\n');
//         });
//         break;
//       case 'add':
//         cache.add(url).then( response => {
//           debug('added ' + url + '\n');
//         });
//         break;
//     }
//   });
// });



// 'use strict';
// var DEBUG = true;
// if (!self.debug) {
//   self.debug = function debug(message) {
//     dump("Execution context: " + message + "\n");
//   };
// }

// self.addEventListener('install', evt => {
//   if (DEBUG) {
//     debug('install event fired!');
//   }

//   function delaysAsInstalled() {
//     return Promise.resolve();
//   }
//   evt.waitUntil(
//     caches.open('v1').then(function(cache) {
//       debug('caching image into cache');
//       return cache.addAll([
//         '/',
//         '/css/app.css',
//         '/js/app.js',
//         '/img/mozilla.png']);
//     });
//   );
// });

// self.addEventListener('activate', evt => {
//   if (DEBUG) {
//     debug('activate event fired!');
//   }
//   function delaysAsActivated() {
//     return Promise.resolve();
//   }
//   evt.waitUntil(delaysAsActivated());
// });

// self.addEventListener('fetch', evt => {
//   var request = evt.request;
//   var url = new URL(request.url);
//   if (DEBUG) {
//     debug('fetching ' + url.pathname);
//   }
//   evt.respondWith(
//     caches.open('v1').then(function(cache) {
//       return cache.matchAll().then(response => {
//         response.map(resp => {
//           debug(resp.url);
//         });
//       });
//     });
//   );
// });

'use strict';

var DEBUG = true;

if (!self.debug) {
    self.debug = function debug(message) {
        dump("Execution context: " + message + "\n");
    };
}

self.addEventListener('install', function(evt) {
    if (DEBUG) {
    debug('install event fired!');
}

function delaysAsInstalled() {
    return Promise.resolve();
}

evt.waitUntil(
    caches.open('v1').then(function(cache) {
        debug('install adding all');
    return cache.addAll([
    '/',
    '/css/app.css',
    '/js/app.js',
    '/img/mozilla.png']);
    })
);
});

self.addEventListener('activate', function(evt) {
    if (DEBUG) {
    debug('activate event fired!');
}
function delaysAsActivated() {
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
    caches.open('v1').then(function(cache) {
       debug('fetch trace match all');
       return cache.matchAll().then(function(res) {
         res.map(function(r) {
           debug(r.url);
         });
           debug('jaoo return ' + res[0].url);
       });
    }));
});