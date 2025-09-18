/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 0,
  },
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'react-country-flag'],
    optimizeCss: false,
    webpackBuildWorker: true,
    scrollRestoration: true,
    esmExternals: 'loose',
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: process.env.NODE_ENV === 'production',
  productionBrowserSourceMaps: false,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
      config.optimization.removeAvailableModules = true
      config.optimization.removeEmptyChunks = true
      config.optimization.splitChunks.maxSize = 100000
    }
    
    if (!dev && !isServer) {
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
      config.optimization.concatenateModules = false
      
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        minSize: 5000,
        maxSize: 60000,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
            maxSize: 40000,
          },
          heroicons: {
            test: /[\\/]node_modules[\\/]@heroicons[\\/]/,
            name: 'heroicons',
            priority: 25,
            chunks: 'all',
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 30,
            chunks: 'all',
            maxSize: 100000,
          },
          next: {
            test: /[\\/]node_modules[\\/]next[\\/]/,
            name: 'next-framework',
            priority: 40,
            chunks: 'all',
            maxSize: 80000,
          },
          components: {
            test: /[\\/]components[\\/]/,
            name: 'components',
            priority: 15,
            chunks: 'all',
            maxSize: 60000,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            chunks: 'all',
            enforce: true,
            maxSize: 30000,
          }
        }
      }
    }
    
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 