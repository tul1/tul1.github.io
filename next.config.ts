import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        // Part 1 was published before the series had a naming scheme.
        // Keep the original URL working: it is in the RSS feed and indexed.
        source: "/blog/go-skills-for-claude",
        destination: "/blog/go-skills-part-1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
