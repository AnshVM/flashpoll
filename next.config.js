/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: 'https://flashpoll-api.onrender.com/:path*'
      }
    ]
  }
}

module.exports = nextConfig
