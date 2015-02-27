'use strict';

// var sendToSW = function(payload) {
//   return new Promise(function(resolve, reject) {
//     if (navigator.serviceWorker) {
//       var channel = new MessageChannel();
//       channel.port1.onmessage = function(e) {
//         resolve(e);
//       };
//       payload.port = channel.port2;
//       serviceWorker.postMessage(payload, [channel.port2]);
//     } else {
//       reject(Error('No Service Worker'));
//     }
//   });
// };

var sendToSW = null;

window.addEventListener('DOMContentLoaded', function load() {
  window.removeEventListener('DOMContentLoaded', load);

  if ('serviceWorker' in navigator) {
    document.getElementById('check-controller').onclick = function() {
      if (!navigator.serviceWorker.controller) {
        dump('Client context: no navigator.serviceWorker.controller object!\n');
        return;
      }
      dump('Client context: navigator.serviceWorker.controller.state is ' +
           (navigator.serviceWorker.controller.state)+ '\n');
      navigator.serviceWorker.getRegistration().then(swr => {
        if (!swr) {
          return;
        }
        if (swr.installed) {
          dump('Client context (register): registration has an installed' +
               'worker (' + swr.installed.state + ')!\n');
        }
      });
    };

    document.getElementById('unregister-registration').onclick = function() {
      navigator.serviceWorker.getRegistration().then(swr => {
        if (!swr) {
          return;
        }
        swr.unregister().then(result => {
          dump('Client context: unregister registration ' +
               (result ? 'succeed' : 'failed') + '!\n');
        });
      });
    };

    document.getElementById('delete-btn').onclick = function() {
      sendToSW({
        data: {
          command: 'delete',
          url: '/img/mozilla.png' }
        });
    };
    document.getElementById('put-btn').onclick = function() {
      sendToSW({
        data: {
          command: 'put',
          url: '/img/mozilla2.png' }
        });
    };
    document.getElementById('add-btn').onclick = function() {
      sendToSW({
        data: {
          command: 'add',
          url: '/img/mozilla2.png' }
        });
    };

    if (navigator.serviceWorker.controller) {
      return;
    }

    navigator.serviceWorker.register('js/service.js').then(
      swr => {
        if (swr.installing) {
          dump('Client context: registration has an installing' +
               ' worker (' + swr.installing.state + ')!\n');
          // Once the installing worker is set and it changes is because
          // either the waiting worker or the active one is set.
          swr.installing.addEventListener('statechange', evt => {
            if (swr.waiting) {
              dump('Client context: registration has an waiting worker' +
                   '(' + swr.waiting.state + ')!\n');
            }
            if (swr.active) {
              dump('Client context: registration has an active worker ' +
                   '(' + swr.active.state + ')!\n');
            }
          });
        }
      },
      error => {
        dump('Client context: ' + error + '\n');
      });
  }
});