import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    MNEMONIC:z.string(),
    ETH_URI: z.string().url(),
    CONTRACT_ADDRESS: z.string(),
    GAS_LIMIT: z.string().optional().default("5500000"),
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
    MNEMONIC: process.env.MNEMONIC,
    ETH_URI: process.env.ETH_URI,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    GAS_LIMIT: process.env.GAS_LIMIT,
  }
});