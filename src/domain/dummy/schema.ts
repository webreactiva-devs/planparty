import { z } from "zod";

import type { Dummy } from "./types";

export const createDummySchema = z.object({
  name: z
    .string({ required_error: "dummy.name.required" })
    .min(1, { message: "dummy.name.required" })
    .max(50, { message: "dummy.name.format" }),
  description: z
    .string({ required_error: "dummy.name.required" })
    .min(1, { message: "dummy.name.required" })
    .max(50, { message: "dummy.name.format" })
    .optional(),
});

export const INITAL_CREATE_DUMMY = {
  name: null,
};

export const updateDummySchema = z.object({
  name: z
    .string({ required_error: "dummy.name.required" })
    .min(1, { message: "dummy.name.required" })
    .max(100, { message: "dummy.name.format" }),
  description: z
    .string({ required_error: "dummy.name.required" })
    .min(1, { message: "dummy.name.required" })
    .max(50, { message: "dummy.name.format" })
    .optional(),
});

export const getInitialUpdateDummy = (dummy: Dummy) => ({
  name: dummy.name,
  description: dummy?.description ?? undefined,
});
