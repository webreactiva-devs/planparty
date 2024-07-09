import { createListSchema, getInitialUpdateList, updateListSchema } from "@/domain/list/schema";
import type { List } from "@/domain/list/types";

describe("createListSchema", () => {
  test("validates correct input", () => {
    const input = { name: "Test List", user: "Test User" };
    expect(() => createListSchema.parse(input)).not.toThrow();
  });

  test("throws an error on missing name", () => {
    const input = { name: "", user: "Test User" };
    expect(() => createListSchema.parse(input)).toThrow();
  });

  test("throws an error on missing user", () => {
    const input = { name: "Test List", user: "" };
    expect(() => createListSchema.parse(input)).toThrow();
  });

  test("throws an error on name too long", () => {
    const input = { name: "A".repeat(51), user: "Test User" };
    expect(() => createListSchema.parse(input)).toThrow();
  });

  test("throws an error on user too long", () => {
    const input = { name: "Test List", user: "A".repeat(51) };
    expect(() => createListSchema.parse(input)).toThrow();
  });
});

describe("updateListSchema", () => {
  test("validates correct input", () => {
    const input = { name: "Updated List", user: "Updated User" };
    expect(() => updateListSchema.parse(input)).not.toThrow();
  });

  test("throws an error on missing name", () => {
    const input = { name: "", user: "Updated User" };
    expect(() => updateListSchema.parse(input)).toThrow();
  });

  test("throws an error on missing user", () => {
    const input = { name: "Updated List", user: "" };
    expect(() => updateListSchema.parse(input)).toThrow();
  });

  test("throws an error on name too long", () => {
    const input = { name: "A".repeat(101), user: "Updated User" };
    expect(() => updateListSchema.parse(input)).toThrow();
  });

  test("throws an error on user too long", () => {
    const input = { name: "Updated List", user: "A".repeat(101) };
    expect(() => updateListSchema.parse(input)).toThrow();
  });
});

describe("getInitialUpdateList", () => {
  test("returns correct output", () => {
    const list: List = { id: "aaaa", name: "Initial List", user: "Initial User", created_at: new Date() };
    const expectedOutput = { name: "Initial List", user: "Initial User" };
    expect(getInitialUpdateList(list)).toEqual(expectedOutput);
  });
});
