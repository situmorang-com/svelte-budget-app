import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';
import {viteStaticCopy} from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    svelte(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/icons', // Location of your icons
          dest: '.' // Output directory
        },
        {
          src: 'api', // Location of your api and groceries.json
          dest: '.' // Output directory
        },
        {
          src: 'src/assets/favicon.svg',  // Location of your favicon
          dest: ''                        // Root directory in the output folder
        },
        {
          src: 'src/assets/favicon.png',  // Location of your favicon
          dest: ''                        // Root directory in the output folder
        }
      ]
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Grocery App',
        short_name: 'Grocery',
        description: 'Manage your grocery purchases and items.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff', // Background color of the splash screen
        theme_color: '#4caf50', // Add the theme color here (adjust as needed)
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\//, // Cache all matching routes
            handler: 'NetworkFirst', // Use NetworkFirst strategy for dynamic content
            options: {
              cacheName: 'my-runtime-cache',
              expiration: {
                maxEntries: 100, // Adjust as needed
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash][extname]`
      }
    }
  }
});
