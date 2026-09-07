import type { NextConfig } from "next";

// Next.js serves everything in /public with `Cache-Control: public, max-age=0`,
// so the browser re-requests every asset on each page view. For the videos that
// meant ~28 MB re-downloaded per visit, split into hundreds of Range requests —
// which is what blew through the Vercel Edge Requests quota. Headers are matched
// before the filesystem, so these override the default.
const IMMUTABLE = "public, max-age=31536000, immutable";
const REVALIDATE_DAILY = "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        // Videos are fixed assets — bust the cache by renaming or adding ?v=N.
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        // Images can be swapped from /admin, so keep these revalidating.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: REVALIDATE_DAILY }],
      },
      {
        source: "/seo/:path*",
        headers: [{ key: "Cache-Control", value: REVALIDATE_DAILY }],
      },
    ];
  },
};

export default nextConfig;
