/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: 'https://flashpoll.onrender.com/:path*'
      }
    ]
  }
}

module.exports = nextConfig
