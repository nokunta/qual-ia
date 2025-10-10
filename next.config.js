/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/qual-ia',
  trailingSlash: true,
}

module.exports = nextConfig

