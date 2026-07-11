// Enables source map generation for the production client bundle so that
// PostHog Error Tracking can symbolicate JavaScript stack traces coming from
// docs.tscircuit.com. Docusaurus disables source maps in production by default
// (webpack `devtool: false`), which is why errors show up as unreadable
// minified frames (e.g. "/assets/js/common.*.js").
//
// We use "hidden-source-map" so the emitted .js chunks do NOT advertise a
// `sourceMappingURL`, keeping the maps out of the browser. The maps are still
// written next to their chunks so `scripts/upload-sourcemaps.ts` can upload
// them to PostHog after the build and then delete them.
module.exports = function posthogSourcemapPlugin() {
  return {
    name: "posthog-sourcemap-plugin",
    configureWebpack(_config, isServer) {
      // Only the client bundle is served to browsers, and only production
      // builds are deployed, so there is nothing to symbolicate otherwise.
      if (isServer || process.env.NODE_ENV !== "production") {
        return {}
      }
      return { devtool: "hidden-source-map" }
    },
  }
}
