import { useNavigate } from "react-router-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import type { Mock } from "vitest";

import ListListPage from "@/presentation/list/list/ListListPage";
import { ListRoutes } from "@/presentation/list/routes";
import { useGetLists } from "@/services/list/services";
import { dateFormatter } from "@/utils/formatDate";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: vi.fn(),
  };
});

vi.mock("@/services/list/services", () => ({
  useGetLists: vi.fn(),
}));

const data = [
  {
    id: "1",
    name: "List 1",
    user: "User 1",
    created_at: new Date("2025-06-04"),
  },
  {
    id: "2",
    name: "List 2",
    user: "User 2",
    created_at: new Date("2025-05-02"),
  },
];

describe("ListListPage", () => {
  test('renders "Name", "User", "Created", and "Actions" table headers', () => {
    (useGetLists as Mock).mockReturnValue({ data });
    render(<ListListPage />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("Created")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument(); // Verificar nueva columna
  });

  test("displays loading state", () => {
    (useGetLists as Mock).mockReturnValue({ isLoading: true });
    render(<ListListPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error state", () => {
    (useGetLists as Mock).mockReturnValue({ isError: true });
    render(<ListListPage />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  test("displays list of lists when request is successful", () => {
    (useGetLists as Mock).mockReturnValue({ data });
    render(<ListListPage />);
    data.forEach((list) => {
      expect(screen.getByText(list.name)).toBeInTheDocument();
      expect(screen.getByText(list.user)).toBeInTheDocument();
      expect(screen.getByText(dateFormatter.format(list.created_at))).toBeInTheDocument();
    });
  });

  test("navigates to delete page on button click", () => {
    (useGetLists as Mock).mockReturnValue({ data });
    const navigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigate);
    render(<ListListPage />);
    const buttons = screen.getAllByText("Delete");
    fireEvent.click(buttons[0]);
    expect(navigate).toHaveBeenCalledWith(ListRoutes.delete(data[0].id));
  });
});
