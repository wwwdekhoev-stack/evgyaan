/** @type {import('next').NextConfig} */
module.exports = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production' ? true : false,
    },
    images: {
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
    async redirects() {
      return [
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
