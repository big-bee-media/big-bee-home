/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  images: {
    unoptimized: false
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /LICENSE|README.md/,
      use: 'raw-loader',
    })
    config.module.rules.push({
      test: /\.d\.ts/,
      use: 'raw-loader',
    })

    return config
  }
}

module.exports = nextConfig
