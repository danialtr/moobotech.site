/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Movie night: a standalone page (public/watch.html) served at /watch
  async rewrites() {
    return [{ source: "/watch", destination: "/watch.html" }];
  },
};

export default nextConfig;
