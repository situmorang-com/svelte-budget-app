import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log('Service Worker registered with scope: ', registration.scope);
      },
      (error) => {
        console.error('Service Worker registration failed: ', error);
      }
    );
  });
}

window.addEventListener('online', () => {
  console.log('Network status: Online. Syncing groceries...');
  syncGroceriesWithServer();
  fetchPurchasedItems();
});


export default app
