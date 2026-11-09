/** @type {import('next').NextConfig} */
module.exports = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    compiler: {
      // Strip console.log/debug/info from the production bundle, but KEEP
      // console.error and console.warn. The old `removeConsole: true` also
      // stripped them from server code, so the API route's three
      // console.error calls (missing key / MailerLite failure / unexpected
      // throw) never reached Vercel logs - subscriber signups could fail
      // silently with no signal at all.
      removeConsole:
        process.env.NODE_ENV === 'production'
          ? { exclude: ['error', 'warn'] }
          : false,
    },
    images: {
      // AVIF first, WebP as the fallback. Next only ships WebP by default;
      // AVIF is typically 25-35% smaller at the same quality and is the
      // LCP element on every article, so this is the cheapest real win
      // available. Cost: slower image encoding on first request.
      formats: ['image/avif', 'image/webp'],
      // Optimised variants were being served with `max-age=0,
      // must-revalidate`, so every repeat visitor re-checked every
      // thumbnail. Source files already carry a content hash in the
      // filename (hero-861b6421.jpg), so they're immutable by
      // construction - a year is safe.
      minimumCacheTTL: 31536000,
      // Hero/source images top out around 1600-1920px wide (see
      // thumbnail-template-spec.md). Next's own defaults include 2048 and
      // 3840, which are pointless above our real max source width and were
      // forcing the optimizer onto an oversized breakpoint for a ~1200px
      // slot on high-DPI screens. Capping deviceSizes here keeps every
      // generated variant <= the real source size.
      deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384],
    },
    webpack: config => {
      config.plugins.push(new VeliteWebpackPlugin())
      return config
    },
    async headers() {
      return [
        {
          // Deliberately NOT a Content-Security-Policy. A real CSP needs
          // testing against the MDX runtime (MdxContent.js uses
          // `new Function`, which requires unsafe-eval) and would break
          // the site if shipped carelessly. These four are the zero-risk
          // ones worth having on a site that captures email addresses.
          source: '/:path*',
          headers: [
            // Stop browsers guessing a response's type - the usual route
            // from "uploaded file" to "executed script".
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            // Clickjacking: without this, anyone can iframe evgyan.com
            // inside a lookalike page and overlay it.
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            // Send the full URL only to ourselves; cross-site requests
            // get the origin alone.
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            // Nothing on this site needs these APIs.
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
            },
          ],
        },
        {
          // Content hero images are content-hashed, so they never change
          // under the same name.
          source: '/blogs/:path*',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          ],
        },
      ]
    },
    async redirects() {
      return [
        // /ev-guide and /ev-buying-guide were two near-duplicate pages
        // (62.8% identical body text) offering the same free guide, both
        // canonicalised and indexable, competing for the same query.
        // /ev-buying-guide is the one the footer links to, so it wins;
        // this keeps any existing /ev-guide link (YouTube descriptions,
        // older posts) working and consolidates the ranking signals.
        {
          source: '/ev-guide',
          destination: '/ev-buying-guide',
          permanent: true,
        },
        // Three-Wheeler was briefly a live, indexable category page before
        // being folded into Commercial EVs - permanent redirect instead of
        // a dead link for anyone (or Google) with the old URL.
        {
          source: '/categories/three-wheeler',
          destination: '/categories/commercial-evs',
          permanent: true,
        },
        {
          source: '/categories/three-wheeler/page/:page',
          destination: '/categories/commercial-evs',
          permanent: true,
        },
      ]
    },
  }

  class VeliteWebpackPlugin {
    static started = false
    apply(/** @type {import('webpack').Compiler} */ compiler) {
      // executed three times in nextjs
      // twice for the server (nodejs / edge runtime) and once for the client
      compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
        if (VeliteWebpackPlugin.started) return
        VeliteWebpackPlugin.started = true
        const dev = compiler.options.mode === 'development'
        const { build } = await import('velite')
        await build({ watch: dev, clean: !dev })
      })
    }
  }
