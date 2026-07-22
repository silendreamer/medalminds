import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/**": ["./content/nsb/lessons/**"]
  },
  turbopack: {
    root: path.resolve(__dirname)
  }
};

export default nextConfig;
