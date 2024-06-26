import { useNavigate } from "react-router-dom";

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { Mock } from "vitest";

import { useMutationCreateList } from "@/services/list/services";

import ListCreate from "./ListCreate";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: vi.fn(),
  };
});

vi.mock("@/services/List/services", () => ({
  useMutationCreateList: vi.fn(),
}));

describe("Create a List", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  test("Default render", async () => {
    (useMutationCreateList as Mock).mockReturnValue({ status: "", mutateAsync: vi.fn() });
    render(<ListCreate />);

    expect(screen.getByRole("heading", { name: /crear List/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /crear List/i })).toBeInTheDocument();
  });

  test("Loading states", async () => {
    (useMutationCreateList as Mock).mockReturnValue({ status: "pending" });

    render(<ListCreate />);
    expect(screen.getByRole("button", { name: /crear List/i })).toBeDisabled();
  });

  test("form validation errors displayed when submitting empty form", async () => {
    (useMutationCreateList as Mock).mockReturnValue({ status: "", mutateAsync: vi.fn() });
    render(<ListCreate />);
    act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /crear List/i }));
      await waitFor(() => {
        expect(screen.getByText(/List.name.required/i)).toBeInTheDocument();
      });
    });
  });

  test("submit and after submit", async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({});
    (useMutationCreateList as Mock).mockReturnValue({ status: "", mutateAsync: mockMutateAsync });
    const navigateMock = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigateMock);
    render(<ListCreate />);

    act(async () => {
      userEvent.type(await screen.findByLabelText(/nombre/i), "Test List");
      userEvent.type(await screen.findByLabelText(/usuario/i), "Test User");
      userEvent.click(screen.getByRole("button", { name: /crear List/i }));
      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
