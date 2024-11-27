require('dotenv').config()

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

module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_PORT: process.env.API_PORT,
  },
}

module.exports = nextConfig
