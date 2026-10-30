export default function manifest() {
    return {
      name: 'EVGyan',
      short_name: 'EVGyan',
      description: 'Honest EV news, sales data and reviews for electric cars and two-wheelers in India.',
      start_url: '/',
      display: 'standalone',
      background_color: '#111318',
      theme_color: '#111318',
      icons: [
        {
          src: '/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          src: '/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }
  }
