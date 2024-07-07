import { act } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { Mock } from "vitest";

import type { Dummy } from "@/domain/dummy/types";
import { useGetDummy, useMutationUpdateDummy } from "@/services/dummy/services";

import DummyEditPage from "./DummyEditPage";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock("@/services/dummy/services", () => ({
  useGetDummy: vi.fn(),
  useMutationUpdateDummy: vi.fn(),
}));

describe("Edit a Dummy", () => {
  beforeEach(() => {
    (useGetDummy as Mock).mockReturnValue({
      isLoading: false,
      isSuccess: true,
      data: {
        id: 1,
        name: "name",
        description: "description",
        createdAt: new Date(),
      } as Dummy,
    });
    (useParams as Mock).mockReturnValue({ id: "1" });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  test("Default render", async () => {
    (useMutationUpdateDummy as Mock).mockReturnValue({ status: "", mutateAsync: vi.fn() });
    render(<DummyEditPage />);

    expect(screen.getByRole("heading", { name: /editar dummy/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });

  test("Default loading", async () => {
    (useGetDummy as Mock).mockReturnValue({ isLoading: true, isSuccess: false, isError: false, data: null });
    render(<DummyEditPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Default error", async () => {
    (useGetDummy as Mock).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: true,
      data: null,
    });
    render(<DummyEditPage />);

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  test("Loading states form", async () => {
    (useMutationUpdateDummy as Mock).mockReturnValue({ status: "pending" });

    render(<DummyEditPage />);
    expect(screen.getByRole("button", { name: /save changes/i })).toBeDisabled();
  });

  test("form validation errors displayed when submitting empty form", async () => {
    (useMutationUpdateDummy as Mock).mockReturnValue({ status: "", mutateAsync: vi.fn() });
    render(<DummyEditPage />);
    act(async () => {
      const inputs = screen.getAllByRole("textbox"); // Esto seleccionará todos los inputs de tipo 'textbox'
      inputs.forEach((input) => {
        userEvent.clear(input);
      });
      fireEvent.click(screen.getByRole("button", { name: /save changes/i }));
      await waitFor(() => {
        screen.getAllByRole("textbox").forEach((input) => {
          expect(input).toHaveValue("");
        });
        expect(screen.getByText(/dummy.name.required/i)).toBeInTheDocument();
      });
    });
  });

  test("submit and after submit", async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({});
    (useMutationUpdateDummy as Mock).mockReturnValue({ status: "", mutateAsync: mockMutateAsync });
    const navigateMock = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigateMock);
    render(<DummyEditPage />);

    act(async () => {
      userEvent.type(await screen.findByLabelText(/nombre/i), "Edited List");
      userEvent.type(await screen.findByLabelText("Descripción"), "Edited Description");
      userEvent.click(screen.getByRole("button", { name: /save changes/i }));
      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
