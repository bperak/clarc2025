/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.adrionik.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cji.uniri.hr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.infobip.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.ericsson.hr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.profil-klett.hr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ihjj.hr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.carnet.hr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'croai.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.porin.hr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'syntagent.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.webhotelier.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pix8.agoda.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.liburnia.hr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.amadriapark.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media-cdn.tripadvisor.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dynamic-media-cdn.tripadvisor.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mycroatiacruise.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        handlebars: false, // prevents server-only package from being bundled client-side
      };
    }
    return config;
  },
};

module.exports = nextConfig; 