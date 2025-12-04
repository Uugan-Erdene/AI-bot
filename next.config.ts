import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_HF_TOKEN: process.env.NEXT_PUBLIC_HF_TOKEN || "",
    HF_TOKEN: process.env.HF_TOKEN || "",
    GEMINI_AI_TOKEN: process.env.GEMINI_AI_TOKEN || "",
    AI_TOKEN: process.env.AI_TOKEN,
  },
};

export default nextConfig;
