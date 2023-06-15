/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
  

// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/*',
      },
    ],
  },
}
