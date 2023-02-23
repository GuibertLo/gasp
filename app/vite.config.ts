/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import pluginRewriteAll from "vite-plugin-rewrite-all";
import { VitePWA } from "vite-plugin-pwa";

// ElementPlus import
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    environment: "happy-dom",
  },
  plugins: [
    vue(),
    pluginRewriteAll(),
    // For PWA capacities
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        navigateFallback: undefined,
      },
      includeAssets: [
        "apple-touch-icon.png",
        "favicon-32x32.png",
        "favicon-16x16.png",
        "safari-pinned-tab.svg",
        "pwa-192x192.png",
        "pwa-512x512.png",
        "favicon.ico",
      ],
      manifest: {
        name: "GASP",
        short_name: "GASP",
        description: "Guide to Assess Security and Privacy",
        theme_color: "#ffffff",
        id: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
    AutoImport({
      resolvers: [ElementPlusResolver({ ssr: true })],
    }),
    Components({
      resolvers: [ElementPlusResolver({ ssr: true })],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/",
  assetsInclude: ["thesis.pdf", "manifest.webmanifest", "robots.txt"],
});
