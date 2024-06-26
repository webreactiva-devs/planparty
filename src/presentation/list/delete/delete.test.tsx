import { useNavigate, useParams } from "react-router-dom";

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { Mock } from "vitest";

import ListDeletePage from "@/presentation/list/delete/ListDeletePage";
import { useGetOneList, useMutationDeleteList } from "@/services/list/services";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock("@/services/list/services", () => ({
  useGetOneList: vi.fn(),
  useMutationDeleteList: vi.fn(),
}));

const mockList = {
  id: "1",
  name: "Test List",
  user: "Test User",
  created_at: new Date("2025-06-04"),
};

describe("Delete a List", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Default render", async () => {
    (useParams as Mock).mockReturnValue({ id: "1" });
    (useGetOneList as Mock).mockReturnValue({ isSuccess: true, data: mockList });
    (useMutationDeleteList as Mock).mockReturnValue({ status: "", mutateAsync: vi.fn() });

    render(<ListDeletePage />);

    expect(screen.getByRole("heading", { name: /delete list/i })).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to delete the list named test list\?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  test("Loading states", async () => {
    (useParams as Mock).mockReturnValue({ id: "1" });
    (useGetOneList as Mock).mockReturnValue({ isLoading: true });

    render(<ListDeletePage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Error state", async () => {
    (useParams as Mock).mockReturnValue({ id: "1" });
    (useGetOneList as Mock).mockReturnValue({ isError: true });

    render(<ListDeletePage />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  test("submit and after submit", async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({});
    (useMutationDeleteList as Mock).mockReturnValue({ status: "", mutateAsync: mockMutateAsync });
    const navigateMock = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigateMock);
    (useParams as Mock).mockReturnValue({ id: "1" });
    (useGetOneList as Mock).mockReturnValue({ isSuccess: true, data: mockList });

    render(<ListDeletePage />);

    act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /delete/i }));
      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith("/lists");
      });
    });
  });
});
