import { act, renderHook, waitFor } from "@testing-library/react";
import type { Mock } from "vitest";

import { type CreateDummy, type Dummy, type UpdateDummy } from "@/domain/dummy/types";
import { useGetDummies, useGetDummy, useMutationCreateDummy, useMutationUpdateDummy } from "@/services/dummy/services";
import { serviceLocator } from "@/services/serviceLocator";
import AppWrapper from "@/utils/test/AppWrapper";

vi.mock("@/services/serviceLocator", () => ({
  serviceLocator: {
    get: vi.fn().mockReturnValue({
      findAll: vi.fn(),
      findOne: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    }),
  },
}));

describe("Dummy services", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("useGetDummies calls useGetList with correct parameters", async () => {
    const date = new Date();
    const expectedOutput: Dummy[] = [{ id: 1, name: "name", description: "description", createdAt: date }];
    (serviceLocator.get("DummyRepository") as { findAll: Mock }).findAll.mockResolvedValue(expectedOutput);

    const { result, rerender } = renderHook(() => useGetDummies(), { wrapper: AppWrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    rerender();
    expect(result.current.data).toStrictEqual(expectedOutput);
  });
  test("useGetDummy calls findOne with correct parameters", async () => {
    const date = new Date();
    const expectedOutput: Dummy = { id: 1, name: "name", description: "description", createdAt: date };
    (serviceLocator.get("DummyRepository") as { findOne: Mock }).findOne.mockResolvedValue(expectedOutput);
    const { result, rerender } = renderHook(() => useGetDummy(expectedOutput.id), { wrapper: AppWrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    rerender();
    expect(result.current.data).toStrictEqual(expectedOutput);
  });
  test("useMutationCreateDummy calls create with correct parameters", async () => {
    const newDummy: CreateDummy = { name: "name", description: "description" };
    (serviceLocator.get("DummyRepository") as { create: Mock }).create.mockResolvedValue(newDummy);
    const { result } = renderHook(() => useMutationCreateDummy(), { wrapper: AppWrapper });
    act(() => {
      result.current.mutate(newDummy);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect((serviceLocator.get("DummyRepository") as { create: Mock }).create).toHaveBeenCalledWith(newDummy);
  });
  test("useMutationCreateDummy calls create with correct parameters", async () => {
    const newDummy: UpdateDummy = { name: "name", description: "description" };
    const newId = 1;
    (serviceLocator.get("DummyRepository") as { update: Mock }).update.mockResolvedValue(newDummy);
    const { result } = renderHook(() => useMutationUpdateDummy(newId), { wrapper: AppWrapper });
    act(() => {
      result.current.mutate(newDummy);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect((serviceLocator.get("DummyRepository") as { update: Mock }).update).toHaveBeenCalledWith(newId, newDummy);
  });
});
