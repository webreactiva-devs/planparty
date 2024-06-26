import type { Tables, TablesInsert, TablesUpdate } from "@/api/types";
import type { CreateList, List, UpdateList } from "@/domain/list/types";
import { ListAdapter } from "@/infrastructure/list/ListAdapter";

describe("ListAdapter", () => {
  const listAdapter = new ListAdapter();

  test("createAdapter should return valid data", () => {
    const input: CreateList = {
      name: "Test List",
      user: "Test User",
    };

    const expectedOutput: TablesInsert<"list"> = {
      name: "Test List",
      user: "Test User",
    };

    const output = listAdapter.createAdapter(input);

    expect(output).toStrictEqual(expectedOutput);
  });

  test("updateAdapter should return valid data", () => {
    const input: UpdateList = {
      user: "Updated User",
      name: "Updated List",
    };

    const expectedOutput: TablesUpdate<"list"> = {
      name: "Updated List",
    };

    const output = listAdapter.updateAdapter(input);

    expect(output).toStrictEqual(expectedOutput);
  });

  test("editAdapter should return valid data", () => {
    const input: UpdateList = {
      user: "Edited User",
      name: "Edited List",
    };

    const expectedOutput: TablesUpdate<"list"> = {
      name: "Edited List",
    };

    const output = listAdapter.editAdapter(input);

    expect(output).toStrictEqual(expectedOutput);
  });

  test("apiModelAdapter should return valid List model", () => {
    const date = "2025-05-10";

    const input: Tables<"list"> = {
      id: "1",
      name: "Test List",
      user: "Test User",
      created_at: date,
      updated_at: date,
    };

    const expectedOutput: List = {
      id: "1",
      name: "Test List",
      user: "Test User",
      created_at: new Date(date),
    };

    const output = listAdapter.apiModelAdapter(input);

    expect(output).toStrictEqual(expectedOutput);
  });

  // Additional tests for edge cases

  test("apiModelAdapter should handle missing name and user", () => {
    const date = "2025-05-10";

    const input: Tables<"list"> = {
      id: "1",
      name: null,
      user: null,
      created_at: date,
      updated_at: date,
    };

    const expectedOutput: List = {
      id: "1",
      name: "",
      user: "",
      created_at: new Date(date),
    };

    const output = listAdapter.apiModelAdapter(input);

    expect(output).toStrictEqual(expectedOutput);
  });

  test("createAdapter should handle missing user", () => {
    const input: CreateList = {
      name: "Test List",
      user: undefined as any, // Force undefined user for test
    };

    const expectedOutput: TablesInsert<"list"> = {
      name: "Test List",
      user: undefined,
    };

    const output = listAdapter.createAdapter(input);

    expect(output).toStrictEqual(expectedOutput);
  });

  test("updateAdapter should handle empty name", () => {
    const input: UpdateList = {
      name: "",
      user: "Updated User",
    };

    const expectedOutput: TablesUpdate<"list"> = {
      name: "",
    };

    const output = listAdapter.updateAdapter(input);

    expect(output).toStrictEqual(expectedOutput);
  });

  test("editAdapter should handle empty name", () => {
    const input: UpdateList = {
      name: "",
      user: "Edited User",
    };

    const expectedOutput: TablesUpdate<"list"> = {
      name: "",
    };

    const output = listAdapter.editAdapter(input);

    expect(output).toStrictEqual(expectedOutput);
  });
});
