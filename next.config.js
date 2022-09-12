/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['notrodans.github.io', 'dodopizza.azureedge.net']
  }
}

module.exports = nextConfig
