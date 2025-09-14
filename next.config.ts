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
        domains: [
            "localhost",
            "weats.ru",
            "eda.yandex.ru",
            "media-cdn.tripadvisor.com",
            "images.vfl.ru",
            "www.restoclub.ru",
            "vkus-eda-dostavka.ru",
            "eda.yandex",
            "avatars.mds.yandex.net",
        ],
    },
};

export default nextConfig;
