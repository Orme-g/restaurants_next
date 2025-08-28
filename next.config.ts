import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    /* config options here */
    sassOptions: {
        includePaths: [path.join(__dirname, "src/shared/styles")],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ["localhost", "weats.ru"],
    },
};

export default nextConfig;
