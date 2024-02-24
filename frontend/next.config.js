/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    reactStrictMode: false,
    images: {
        domains: ['localhost', "lh3.googleusercontent.com", "cdn.intra.42.fr", 'cloudflare-ipfs.com', 'avatars.githubusercontent.com', 'loremflickr.com', 'picsum.photos'],
    },
};
