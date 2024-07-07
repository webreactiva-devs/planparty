import { useNavigate } from "react-router-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import type { Mock } from "vitest";

import type { Dummy } from "@/domain/dummy/types";
import DummyListPage from "@/presentation/dummy/list/DummyListPage";
import { DummyRoutes } from "@/presentation/dummy/routes";
import { useGetDummies } from "@/services/dummy/services";
import { dateFormatter } from "@/utils/formatDate";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: vi.fn(),
  };
});

vi.mock("@/services/dummy/services", () => ({
  useGetDummies: vi.fn(),
}));

const data: Dummy[] = [
  {
    id: 1,
    name: "Dummy 1",
    description: "Description 1",
    createdAt: new Date("2025-06-04"),
  },
  {
    id: 2,
    name: "Dummy 2",
    description: "Description 2",
    createdAt: new Date("2025-05-02"),
  },
];

describe("DummyListPage", () => {
  test('renders "Crear Dummy" button and navigates on click', async () => {
    (useGetDummies as Mock).mockReturnValue({ data });
    const navigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigate);
    render(<DummyListPage />);
    const button = screen.getByText("Crear Dummy");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith(DummyRoutes.create);
  });

  test("displays table head", () => {
    (useGetDummies as Mock).mockReturnValue({ data });
    render(<DummyListPage />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Created")).toBeInTheDocument();
  });

  test("displays loading state", () => {
    (useGetDummies as Mock).mockReturnValue({ isLoading: true });
    render(<DummyListPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error state", () => {
    (useGetDummies as Mock).mockReturnValue({ isError: true });
    render(<DummyListPage />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  test("displays list of dummies when request is successful", () => {
    (useGetDummies as Mock).mockReturnValue({ data });
    render(<DummyListPage />);
    data.forEach((dummy) => {
      expect(screen.getByText(dummy.name)).toBeInTheDocument();
      expect(screen.getByText(dateFormatter.format(dummy.createdAt))).toBeInTheDocument();
    });
  });

  test("navigates to edit page on row click", () => {
    (useGetDummies as Mock).mockReturnValue({ data });
    const navigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigate);
    render(<DummyListPage />);
    const rows = screen.getAllByRole("row");
    fireEvent.click(rows[1]);
    expect(navigate).toHaveBeenCalledWith(DummyRoutes.edit(data[0].id));
  });
});
