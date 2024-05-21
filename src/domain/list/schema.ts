import { z } from "zod";

import type { List } from "./types";

export const createListSchema = z.object({
  name: z
    .string({ required_error: "list.name.required" })
    .min(1, { message: "list.name.required" })
    .max(50, { message: "list.name.format" }),
  user: z
    .string({ required_error: "list.user.required" })
    .min(1, { message: "list.user.required" })
    .max(50, { message: "list.user.format" }),
});

export const INITAL_CREATE_LIST = {
  name: null,
};

export const updateListSchema = z.object({
  name: z
    .string({ required_error: "list.name.required" })
    .min(1, { message: "list.name.required" })
    .max(100, { message: "list.name.format" }),
  user: z
    .string({ required_error: "list.user.required" })
    .min(1, { message: "list.user.required" })
    .max(100, { message: "list.user.format" }),
});

export const getInitialUpdateList = (list: List) => ({
  name: list.name,
  user: list.user,
});
