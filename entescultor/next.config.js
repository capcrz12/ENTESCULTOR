/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['via.placeholder.com', 'www.entescultor.com']
  },
  reactStrictMode: true
}

module.exports = nextConfig
