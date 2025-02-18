import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["bapparajdetabase.s3.us-east-1.amazonaws.com"],
    },
};

export default nextConfig;
