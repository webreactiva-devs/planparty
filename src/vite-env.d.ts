/// <reference types="vite/client" />
import { z } from "zod";

const envVars = z.object({
  VITE_SUPABASE_URL: z.string(),
  VITE_SUPABASE_ANON_KEY: z.string(),
});
interface ImportMeta {
  readonly env: z.infer<typeof envVars>;
}
