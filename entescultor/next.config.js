/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['via.placeholder.com', 'www.entescultor.com', 'localhost']
  },
  reactStrictMode: true
}

module.exports = nextConfig
