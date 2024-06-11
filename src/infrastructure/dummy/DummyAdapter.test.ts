import type { Tables, TablesInsert, TablesUpdate } from "@/api/types";
import type { CreateDummy, Dummy, UpdateDummy } from "@/domain/dummy/types";
import { DummyAdapter } from "@/infrastructure/dummy/DummyAdapter";

describe("JobAdapter", () => {
  const jobAdapter = new DummyAdapter();

  test("createAdapter should return valid data", () => {
    const input: CreateDummy = {
      name: "Test",
      description: "Test description",
    };

    const expectedOutput: TablesInsert<"dummy"> = {
      name: "Test",
      description: "Test description",
    };

    const output = jobAdapter.createAdapter(input);

    expect(output).toStrictEqual(expectedOutput);
  });
  test("updateAdapter should return valid data", () => {
    const input: UpdateDummy = {
      name: "Test",
      description: "Test description",
    };

    const expectedOutput: TablesUpdate<"dummy"> = {
      name: "Test",
      description: "Test description",
    };

    const output = jobAdapter.updateAdapter(input);

    expect(output).toStrictEqual(expectedOutput);
  });
  test("apimodel should return valid store", () => {
    const date = "2025-05-10";

    const input: Tables<"dummy"> = {
      id: 1,
      name: "test",
      created_at: date,
      updated_at: date,
      description: "description",
    };
    const expectedOutput: Dummy = {
      id: 1,
      name: "test",
      createdAt: new Date(date),
      description: "description",
    };

    const output = jobAdapter.apiModelAdapter(input);

    expect(output).toStrictEqual(expectedOutput);
  });
});
