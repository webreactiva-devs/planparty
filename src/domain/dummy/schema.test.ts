import { createDummySchema, getInitialUpdateDummy, updateDummySchema } from "@/domain/dummy/schema";
import type { Dummy } from "@/domain/dummy/types";

describe("createDummySchema", () => {
  test("validates correct input", () => {
    const input = { name: "Test" };
    expect(() => createDummySchema.parse(input)).not.toThrow();
  });

  test("throws an error on incorrect input", () => {
    const input = { name: "" };
    expect(() => createDummySchema.parse(input)).toThrow();
  });
});

describe("updateDummySchema", () => {
  test("validates correct input", () => {
    const input = { name: "Test" };
    expect(() => updateDummySchema.parse(input)).not.toThrow();
  });

  test("throws an error on incorrect input", () => {
    const input = { name: "" };
    expect(() => updateDummySchema.parse(input)).toThrow();
  });
});

describe("getInitialUpdateDummy", () => {
  test("returns correct output", () => {
    const dummy: Dummy = { id: 1, createdAt: new Date(), name: "Test", description: "Description" };
    const expectedOutput = { name: "Test", description: "Description" };
    expect(getInitialUpdateDummy(dummy)).toEqual(expectedOutput);
  });
});
