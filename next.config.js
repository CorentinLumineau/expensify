const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

console.log('ENV : ', process.env.NODE_ENV)

const path = require('path');

const nextConfig = withPWA({
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
});

module.exports = nextConfig;