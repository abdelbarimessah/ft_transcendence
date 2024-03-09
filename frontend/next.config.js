/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "cdn.intra.42.fr" },
      { hostname: "cloudflare-ipfs.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "loremflickr.com" },
      { hostname: "picsum.photos" },
      { hostname: "images.pexels.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:8000",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
