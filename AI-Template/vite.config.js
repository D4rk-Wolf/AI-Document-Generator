import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { readFileSync } from "fs";
import { sentryVitePlugin } from "@sentry/vite-plugin";

const { version } = JSON.parse(readFileSync("./package.json", "utf-8"));

const sentryConfigured =
  process.env.SENTRY_AUTH_TOKEN &&
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT;

export default defineConfig({
  base: process.env.GITHUB_PAGES ? "/AI-Document-Generator/" : "/",
  plugins: [
    react(),
    // Uploads source maps to Sentry on production builds.
    // Only active when SENTRY_AUTH_TOKEN, SENTRY_ORG, and SENTRY_PROJECT are all set.
    // Guards against 'getClient' crash when any variable is missing.
    ...(sentryConfigured
      ? [
          sentryVitePlugin({
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
            silent: true,
          }),
        ]
      : []),
  ],
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  define: {
    // Injected from package.json at build time — always in sync with the release version.
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(version),
  },
  build: {
    // "hidden" emits source maps to disk but doesn't link them in the bundle,
    // so they are only available to Sentry, not to end users.
    sourcemap: "hidden",
    chunkSizeWarningLimit: 600,
  },
});
