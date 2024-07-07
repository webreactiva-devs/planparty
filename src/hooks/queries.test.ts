import { useQueryClient } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import type { Mock } from "vitest";

import { useToast } from "@/shadcn/components/ui/use-toast";

import { useErrorToast, useGetList, useGetOne, useMutationGeneral, useSuccessToast } from "./queries";

vi.mock("@tanstack/react-query", () => ({
  QueryClient: vi.fn().mockImplementation(() => ({
    prefetchQuery: vi.fn(),
  })),
  useMutation: vi.fn().mockReturnValue({ isLoading: false, mutate: vi.fn(), mutateAsync: vi.fn() }),
  useQuery: vi.fn().mockReturnValue({ isLoading: false, isError: false, data: {} }),
  useQueryClient: vi.fn(),
}));

vi.mock("@/shadcn/components/ui/use-toast", () => ({
  useToast: vi.fn(),
}));

describe("queries", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("useGetList should fetch list", async () => {
    const { result } = renderHook(() => useGetList({ key: ["testKey"], fn: vi.fn() }));
    expect(result.current.isLoading).toBeDefined();
    expect(result.current.isError).toBeDefined();
    expect(result.current.data).toBeDefined();
  });

  test("should fetch one item", async () => {
    const { result } = renderHook(() => useGetOne({ key: ["testKey"], fn: vi.fn() }));
    expect(result.current.isLoading).toBeDefined();
    expect(result.current.isError).toBeDefined();
    expect(result.current.data).toBeDefined();
  });
});

describe("useMutationGeneral", () => {
  const fn = vi.fn();
  const key = ["testKey"];
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("useMutate should call the mutation function with the provided data", async () => {
    (useToast as Mock).mockReturnValue({ toast: vi.fn() });
    const data = { foo: "bar" };
    const { result } = renderHook(() => useMutationGeneral({ key, fn, properties: {} }));
    expect(result.current.mutate).toBeDefined();
    expect(result.current.mutateAsync).toBeDefined();
    act(() => {
      result.current.mutate(data);
      result.current.mutateAsync(data);
    });
    expect(result.current.mutate).toHaveBeenCalledWith(data);
    expect(result.current.mutateAsync).toHaveBeenCalledWith(data);
  });
});

describe("useSuccessToast", () => {
  test("should call toast with correct parameters", () => {
    const toastMock = vi.fn();
    (useToast as Mock).mockReturnValue({ toast: toastMock });
    const queryClientMock = { invalidateQueries: vi.fn() };
    (useQueryClient as Mock).mockReturnValue(queryClientMock);

    const key = ["testKey"];
    const successMessage = "Success!";
    const { result } = renderHook(() => useSuccessToast());
    act(() => {
      result.current(key, successMessage);
    });
    expect(toastMock).toHaveBeenCalledWith({ title: successMessage });
    expect(queryClientMock.invalidateQueries).toHaveBeenCalledWith({ queryKey: key });
  });
});

describe("useErrorToast", () => {
  const toastMock = vi.fn();
  beforeEach(() => {
    (useToast as Mock).mockReturnValue({ toast: toastMock });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("should call toast with correct parameters", () => {
    const errorMessage = "Error!";
    const { result } = renderHook(() => useErrorToast());
    act(() => {
      result.current(errorMessage);
    });
    expect(toastMock).toHaveBeenCalledWith({ title: errorMessage, variant: "destructive" });
  });
  it("displays a default error message if none is provided", () => {
    const { result } = renderHook(() => useErrorToast());
    act(() => {
      result.current();
    });

    expect(toastMock).toHaveBeenCalledWith({
      title: "Se ha producido un error inesperado",
      variant: "destructive",
    });
  });
});
