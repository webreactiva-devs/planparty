import { act, renderHook, waitFor } from "@testing-library/react";
import type { Mock } from "vitest";

import { type CreateList, type List, type UpdateList } from "@/domain/list/types";
import {
  useGetLists,
  useGetOneList,
  useMutationCreateList,
  useMutationDeleteList,
  useMutationUpdateList,
} from "@/services/list/services";
import { serviceLocator } from "@/services/serviceLocator";
import AppWrapper from "@/utils/test/AppWrapper";

vi.mock("@/services/serviceLocator", () => ({
  serviceLocator: {
    get: vi.fn().mockReturnValue({
      findAll: vi.fn(),
      findOne: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }),
  },
}));

describe("List services", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("useGetLists calls findAll with correct parameters", async () => {
    const date = new Date();
    const expectedOutput: List[] = [{ id: "1", name: "name", user: "user", created_at: date }];
    (serviceLocator.get("ListRepository") as { findAll: Mock }).findAll.mockResolvedValue(expectedOutput);

    const { result, rerender } = renderHook(() => useGetLists(), { wrapper: AppWrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    rerender();
    expect(result.current.data).toStrictEqual(expectedOutput);
  });

  test("useGetOneList calls findOne with correct parameters", async () => {
    const date = new Date();
    const expectedOutput: List = { id: "1", name: "name", user: "user", created_at: date };
    (serviceLocator.get("ListRepository") as { findOne: Mock }).findOne.mockResolvedValue(expectedOutput);

    const { result, rerender } = renderHook(() => useGetOneList(expectedOutput.id), { wrapper: AppWrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    rerender();
    expect(result.current.data).toStrictEqual(expectedOutput);
  });

  test("useMutationCreateList calls create with correct parameters", async () => {
    const newList: CreateList = { name: "name", user: "user" };
    (serviceLocator.get("ListRepository") as { create: Mock }).create.mockResolvedValue(newList);

    const { result } = renderHook(() => useMutationCreateList(), { wrapper: AppWrapper });

    act(() => {
      result.current.mutate(newList);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect((serviceLocator.get("ListRepository") as { create: Mock }).create).toHaveBeenCalledWith(newList);
  });

  test("useMutationUpdateList calls update with correct parameters", async () => {
    const updatedList: UpdateList = { name: "updated name", user: "updated user" };
    const listId = "1";
    (serviceLocator.get("ListRepository") as { update: Mock }).update.mockResolvedValue(updatedList);

    const { result } = renderHook(() => useMutationUpdateList(listId), { wrapper: AppWrapper });

    act(() => {
      result.current.mutate(updatedList);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect((serviceLocator.get("ListRepository") as { update: Mock }).update).toHaveBeenCalledWith(listId, updatedList);
  });

  test("calls delete with correct parameters", async () => {
    const listId = "1";
    const mockDelete = vi.fn().mockResolvedValue(undefined);
    (serviceLocator.get("ListRepository") as { delete: Mock }).delete = mockDelete;

    const { result } = renderHook(() => useMutationDeleteList(listId), { wrapper: AppWrapper });

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockDelete).toHaveBeenCalledWith(listId);
  });
});
