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
        {
          // Only www.evgyan.com is the real site. Every other host this
          // app answers on - the project's own evgyaan-pi.vercel.app,
          // every preview deployment, any alias added later - is a
          // byte-for-byte copy of it, crawlable, and competing with the
          // canonical host for the same pages. `missing` inverts the
          // match, so this header is sent on every host EXCEPT the
          // canonical one.
          //
          // (This does not cover evgyaan.vercel.app, the 2025 build on a
          // separate Vercel account - that one has to be taken down
          // there, see the 60-day plan R-1.)
          source: '/:path*',
          missing: [{ type: 'host', value: 'www.evgyan.com' }],
          headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
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

        // The "EVGyan Desk" byline was retired on 22 Nov 2026: every
        // story that carried it now carries Vishal Kumar's, so the Desk's
        // author page has no stories left and would otherwise be a 404.
        // It goes to the page where those stories are now listed.
        {
          source: '/authors/evgyan-desk',
          destination: '/authors/vishal-kumar',
          permanent: true,
        },

        // --- Legacy /blogs/article_N URLs -------------------------------
        //
        // The first seven articles went live before slugs were a thing, so
        // their URL was literally the folder name. Five were later deleted
        // and two were re-slugged, which left seven dead URLs - article_4
        // is still sitting in a third-party index and returning a 404.
        // Each one goes to the closest live page rather than the homepage,
        // so whatever link equity exists lands somewhere relevant.
        //
        // article_1 and article_4 were vs-comparisons. When the
        // /compare/[a]-vs-[b] pages exist, repoint these two at them.
        {
          // "Ola Roadster X (2.5kWh) vs Revolt RV1 2.2kWh" - deleted
          source: '/blogs/article_1',
          destination: '/categories/two-wheeler',
          permanent: true,
        },
        {
          // "MG Comet EV Price Hiked in 2025" - deleted
          source: '/blogs/article_2',
          destination: '/brands/mg',
          permanent: true,
        },
        {
          // "Cheapest TVS EV Is Coming!" - deleted
          source: '/blogs/article_3',
          destination: '/brands/tvs',
          permanent: true,
        },
        {
          // "Windsor EV Pro vs Mahindra BE.6e" - deleted
          source: '/blogs/article_4',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          // "Tata Safari EV" - superseded by the current launch story
          source: '/blogs/article_5',
          destination: '/blogs/tata-safari-ev-launch-january-2027',
          permanent: true,
        },
        {
          // Re-slugged, article still live
          source: '/blogs/article_6',
          destination: '/blogs/electric-two-wheeler-sales-september-2026',
          permanent: true,
        },
        {
          // Re-slugged, article still live
          source: '/blogs/article_7',
          destination: '/blogs/electric-car-sales-september-2026',
          permanent: true,
        },

        // --- Retired global news, 18 Nov 2026 --------------------------
        //
        // Sixteen stories with no India angle, retired once they had aged
        // out. They are 301s rather than 404s so whatever links and index
        // entries they earned pass to the section they belonged to instead
        // of dying. The articles themselves are in git history if any of
        // them is ever wanted back.
        {
          source: '/blogs/xpeng-middle-east-li-auto-i6-byd-qin-plus',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/vw-xpeng-europe-platform-mona-l05-global',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/best-selling-evs-in-the-world-september-2026',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/toyota-waymo-robotaxi-bz4x',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/ford-universal-ev-platform-byd-efficiency',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/tesla-model-y-range-increase-same-price',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/byd-ti7-land-rover-defender-copy-claim',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/audi-a4-e-tron-delay-ssp-platform',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/tesla-cybertruck-production-ends-cybercab',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/yangwang-altior-byd-luxury-sedan',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/yangwang-u9-xtreme-top-speed-record',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/tesla-cybercab-price-mkbhd-bet',
          destination: '/categories/four-wheeler',
          permanent: true,
        },
        {
          source: '/blogs/china-electric-truck-sales-half-heavy-trucks',
          destination: '/categories/commercial-evs',
          permanent: true,
        },
        {
          source: '/blogs/ford-mustang-mach-e-battery-health',
          destination: '/categories/battery-charging',
          permanent: true,
        },
        {
          source: '/blogs/catl-lithium-air-battery-range-claim',
          destination: '/categories/battery-charging',
          permanent: true,
        },
        {
          source: '/blogs/comac-ce-25a-electric-plane-first-flight',
          destination: '/categories/policy-industry',
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
