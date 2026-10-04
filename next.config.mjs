/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  basePath: repoName ? (repoName.startsWith("/") ? repoName : `/${repoName}`) : "",
  assetPrefix: repoName ? (repoName.startsWith("/") ? repoName : `/${repoName}`) : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
