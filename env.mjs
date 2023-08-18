import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import packageJson from './package.json'; 

export const env = createEnv({
  server: {
    VERSION: z.string().default(packageJson.version??"0.0.0"),
    // GITHUB_API_TOKEN: z.string(),
  },
  client: {
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
//   runtimeEnv: {
//     DATABASE_URL: process.env.DATABASE_URL,
//     OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
//     NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
//   },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    // GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN
  }
});