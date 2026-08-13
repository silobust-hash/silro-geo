import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.xn--hc0b21et01ao2a.com" }],
        destination: "https://xn--hc0b21et01ao2a.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "silro-geo.vercel.app" }],
        destination: "https://xn--hc0b21et01ao2a.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
