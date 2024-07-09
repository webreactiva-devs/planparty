import type { Mock } from "vitest";

import { supabase } from "@/api/client";
import type { CreateDummy, Dummy, UpdateDummy } from "@/domain/dummy/types";
import { DummyAdapter } from "@/infrastructure/dummy/DummyAdapter";
import { DummyRepository } from "@/infrastructure/dummy/DummyRepository";

vi.mock("@/api/client");

describe("DummyRepository", () => {
  let dummyRepository: DummyRepository;
  const dummyAdapter: DummyAdapter = {
    apiModelAdapter: vi.fn(),
    createAdapter: vi.fn(),
    updateAdapter: vi.fn(),
  };

  beforeEach(() => {
    dummyRepository = new DummyRepository(dummyAdapter);
    (supabase.from as Mock).mockClear();
  });

  test("findAll should return all dummies", async () => {
    const date = "2025-05-10";
    const expectedOutput: Dummy[] = [
      {
        id: 1,
        name: "test",
        createdAt: new Date(date),
        description: "description",
      },
    ];
    (supabase.from as Mock).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: [""] }),
    });
    (dummyAdapter.apiModelAdapter as Mock).mockReturnValueOnce(expectedOutput[0]);

    const result = await dummyRepository.findAll();

    expect(result).toStrictEqual(expectedOutput);
  });

  test("findAll should return empty array if data is null", async () => {
    (supabase.from as Mock).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: null, error: null }),
    });
    const result = await dummyRepository.findAll();
    expect(result).toStrictEqual([]);
  });

  test("findOne should return a dummy", async () => {
    const date = "2025-05-10";
    const expectedOutput: Dummy = {
      id: 1,
      name: "test",
      createdAt: new Date(date),
      description: "description",
    };

    (supabase.from as Mock).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: "", error: null }),
          }),
        }),
      }),
    });
    (dummyAdapter.apiModelAdapter as Mock).mockReturnValueOnce(expectedOutput);

    const result = await dummyRepository.findOne(1);

    expect(result).toStrictEqual(expectedOutput);
  });

  test("create should call post with correct arguments", async () => {
    const createDummyData: CreateDummy = {
      name: "Test",
      description: "Test description",
    };
    const expectedPostBody = DummyRepository.adapter.createAdapter(createDummyData);
    (supabase.from as Mock).mockReturnValue({
      insert: vi.fn().mockResolvedValue({ error: null }),
    });
    await dummyRepository.create(createDummyData);
    expect((supabase.from as Mock).mock.results[0].value.insert).toHaveBeenCalledWith(expectedPostBody);
  });

  test("create should throw Error if there is an error", async () => {
    const createDummyData: CreateDummy = {
      name: "Test",
      description: "Test description",
    };
    (supabase.from as Mock).mockReturnValue({
      insert: vi.fn().mockResolvedValue({ error: { message: "Some error" } }),
    });
    await expect(dummyRepository.create(createDummyData)).rejects.toThrow("Some error");
  });

  test("update should call post with correct arguments", async () => {
    const updateDummyData: UpdateDummy = {
      name: "Test",
      description: "Test description",
    };
    const expectedPostBody = DummyRepository.adapter.updateAdapter(updateDummyData);
    (supabase.from as Mock).mockReturnValue({
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      }),
    });
    const id = 1;
    await dummyRepository.update(id, updateDummyData);
    expect((supabase.from as Mock).mock.results[0].value.update).toHaveBeenCalledWith(expectedPostBody);
    expect((supabase.from as Mock).mock.results[0].value.update.mock.results[0].value.eq).toHaveBeenCalledWith(
      "id",
      id
    );
  });
  test("update should throw Error if there is an error", async () => {
    const updateDummyData: UpdateDummy = {
      name: "Test",
      description: "Test description",
    };
    (supabase.from as Mock).mockReturnValue({
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: { message: "Some error" } }),
      }),
    });
    const id = 1;
    await expect(dummyRepository.update(id, updateDummyData)).rejects.toThrow("Some error");
  });
});
