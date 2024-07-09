import type { Mock } from "vitest";

import { supabase } from "@/api/client";
import type { CreateList, List, UpdateList } from "@/domain/list/types";
import { ListAdapter } from "@/infrastructure/list/ListAdapter";
import { ListRepository } from "@/infrastructure/list/ListRepository";

vi.mock("@/api/client");

describe("ListRepository", () => {
  let listRepository: ListRepository;
  const listAdapter: ListAdapter = {
    apiModelAdapter: vi.fn(),
    createAdapter: vi.fn(),
    updateAdapter: vi.fn(),
    editAdapter: vi.fn(),
  } as any; // TypeScript hack to allow mocking of the methods

  beforeEach(() => {
    listRepository = new ListRepository(listAdapter);
    (supabase.from as Mock).mockClear();
  });

  test("findAll should return all lists", async () => {
    const date = "2025-05-10";
    const expectedOutput: List[] = [
      {
        id: "1",
        name: "test list",
        user: "test user",
        created_at: new Date(date),
      },
    ];
    (supabase.from as Mock).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: [""] }),
    });
    (listAdapter.apiModelAdapter as Mock).mockReturnValueOnce(expectedOutput[0]);

    const result = await listRepository.findAll();

    expect(result).toStrictEqual(expectedOutput);
  });

  test("findAll should return empty array if data is null", async () => {
    (supabase.from as Mock).mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: null, error: null }),
    });
    const result = await listRepository.findAll();
    expect(result).toStrictEqual([]);
  });

  test("findOne should return a list", async () => {
    const date = "2025-05-10";
    const expectedOutput: List = {
      id: "1",
      name: "test list",
      user: "test user",
      created_at: new Date(date),
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
    (listAdapter.apiModelAdapter as Mock).mockReturnValueOnce(expectedOutput);

    const result = await listRepository.findOne("1");

    expect(result).toStrictEqual(expectedOutput);
  });

  test("create should call insert with correct arguments", async () => {
    const createListData: CreateList = {
      name: "Test List",
      user: "Test User",
    };
    const expectedPostBody = listAdapter.createAdapter(createListData);
    (supabase.from as Mock).mockReturnValue({
      insert: vi.fn().mockResolvedValue({ error: null }),
    });
    await listRepository.create(createListData);
    expect((supabase.from as Mock).mock.results[0].value.insert).toHaveBeenCalledWith(expectedPostBody);
  });

  test("create should throw Error if there is an error", async () => {
    const createListData: CreateList = {
      name: "Test List",
      user: "Test User",
    };
    (supabase.from as Mock).mockReturnValue({
      insert: vi.fn().mockResolvedValue({ error: { message: "Some error" } }),
    });
    await expect(listRepository.create(createListData)).rejects.toThrow("Some error");
  });

  test("update should call update with correct arguments", async () => {
    const updateListData: UpdateList = {
      name: "Updated List",
      user: "Updated User",
    };
    const expectedPostBody = listAdapter.updateAdapter(updateListData);
    (supabase.from as Mock).mockReturnValue({
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      }),
    });
    const id = "1";
    await listRepository.update(id, updateListData);
    expect((supabase.from as Mock).mock.results[0].value.update).toHaveBeenCalledWith(expectedPostBody);
    expect((supabase.from as Mock).mock.results[0].value.update.mock.results[0].value.eq).toHaveBeenCalledWith(
      "id",
      id
    );
  });

  test("update should throw Error if there is an error", async () => {
    const updateListData: UpdateList = {
      name: "Updated List",
      user: "Updated User",
    };
    (supabase.from as Mock).mockReturnValue({
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: { message: "Some error" } }),
      }),
    });
    const id = "1";
    await expect(listRepository.update(id, updateListData)).rejects.toThrow("Some error");
  });

  test("delete should call delete with correct arguments", async () => {
    const id = "1";
    (supabase.from as Mock).mockReturnValue({
      delete: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      }),
    });
    await listRepository.delete(id);
    expect((supabase.from as Mock).mock.results[0].value.delete.mock.results[0].value.eq).toHaveBeenCalledWith(
      "id",
      id
    );
  });

  test("delete should throw Error if there is an error", async () => {
    const id = "1";
    (supabase.from as Mock).mockReturnValue({
      delete: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: { message: "Some error" } }),
      }),
    });
    await expect(listRepository.delete(id)).rejects.toThrow("Some error");
  });
});
