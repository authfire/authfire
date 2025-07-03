import { primaryColor, primaryForegroundColor } from "@/lib/const";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    additionalData: `
      $primary: ${primaryColor};
      $primary-foreground: ${primaryForegroundColor};
    `,
  },
};

export default nextConfig;
