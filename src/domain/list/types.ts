import type { z } from "zod";

import type { createListSchema, updateListSchema } from "@/domain/list/schema";

export type List = {
  id: string;
  name: string;
  user: string;
  created_at: Date;
};

export type CreateList = z.infer<typeof createListSchema>;

export type UpdateList = z.infer<typeof updateListSchema>;
