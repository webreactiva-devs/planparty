import { useNavigate } from "react-router-dom";

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { Mock } from "vitest";

import { useMutationCreateDummy } from "@/services/dummy/services";

import DummyCreate from "./DummyCreate";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: vi.fn(),
  };
});

vi.mock("@/services/dummy/services", () => ({
  useMutationCreateDummy: vi.fn(),
}));

describe("Create a Dummy", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  test("Default render", async () => {
    (useMutationCreateDummy as Mock).mockReturnValue({ status: "", mutateAsync: vi.fn() });
    render(<DummyCreate />);

    expect(screen.getByRole("heading", { name: /crear dummy/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /crear dummy/i })).toBeInTheDocument();
  });

  test("Loading states", async () => {
    (useMutationCreateDummy as Mock).mockReturnValue({ status: "pending" });

    render(<DummyCreate />);
    expect(screen.getByRole("button", { name: /crear dummy/i })).toBeDisabled();
  });

  test("form validation errors displayed when submitting empty form", async () => {
    (useMutationCreateDummy as Mock).mockReturnValue({ status: "", mutateAsync: vi.fn() });
    render(<DummyCreate />);
    act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /crear dummy/i }));
      await waitFor(() => {
        expect(screen.getByText(/dummy.name.required/i)).toBeInTheDocument();
      });
    });
  });

  test("submit and after submit", async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({});
    (useMutationCreateDummy as Mock).mockReturnValue({ status: "", mutateAsync: mockMutateAsync });
    const navigateMock = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigateMock);
    render(<DummyCreate />);

    act(async () => {
      userEvent.type(await screen.findByLabelText(/nombre/i), "Test List");
      userEvent.type(await screen.findByLabelText("Descripción"), "Test Description");
      userEvent.click(screen.getByRole("button", { name: /crear dummy/i }));
      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
