'use strict';
window.addEventListener('DOMContentLoaded', function load() {
  window.removeEventListener('DOMContentLoaded', load);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(function(swr) {
      if (!swr) {
        return;
      }
      swr.unregister().then(function(result) {
        console.log('Client context: unregister registration ' +
             (result ? 'succeed' : 'failed') + '!\n');
      });
    });
    
    navigator.serviceWorker.register('js/service.js').then(
      function(swr) {
        if (swr.installing) {
          console.log('Client context: registration has an installing' +
               ' worker (' + swr.installing.state + ')!\n');
          // Once the installing worker is set and it changes is because
          // either the waiting worker or the active one is set.
          swr.installing.addEventListener('statechange', function(evt) {
            if (swr.waiting) {
              console.log('Client context: registration has an waiting worker' +
                   '(' + swr.waiting.state + ')!\n');
            }
            if (swr.active) {
              console.log('Client context: registration has an active worker ' +
                   '(' + swr.active.state + ')!\n');
            }
          });
        }
      },
      function(error) {
        console.log('Client context: ' , error);
      });
  }
});