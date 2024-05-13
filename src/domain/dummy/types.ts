import type { z } from "zod";

import type { createDummySchema, updateDummySchema } from "@/domain/dummy/schema";

export type Dummy = {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
};

export type CreateDummy = z.infer<typeof createDummySchema>;

export type UpdateDummy = z.infer<typeof updateDummySchema>;
