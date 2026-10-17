/** @type {import('next').NextConfig} */
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === "production" ? "/cod-landing-maroc" : "");

const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  basePath: repoName ? (repoName.startsWith("/") ? repoName : `/${repoName}`) : "",
  assetPrefix: repoName ? (repoName.startsWith("/") ? repoName : `/${repoName}`) : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "stepprs.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
