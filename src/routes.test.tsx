import { MemoryRouter, Outlet } from "react-router-dom";

import { render, screen, waitFor } from "@testing-library/react";

import { DummyRoutes } from "@/presentation/dummy/routes";

import { AppRoutes } from "./routes";

vi.mock("./presentation/dummy/list/DummyListPage", () => {
  const DummyListPage = () => (
    <>
      <h1>DummyListPage</h1>
      <Outlet />
    </>
  );
  DummyListPage.displayName = "DummyListPage";
  return { default: DummyListPage };
});
vi.mock("./presentation/dummy/create/DummyCreate", () => {
  const DummyCreate = () => <h1>DummyCreate</h1>;
  DummyCreate.displayName = "DummyCreate";
  return { default: DummyCreate };
});
vi.mock("./presentation/dummy/delete/DummyDeletePage", () => {
  const DummyDeletePage = () => <h1>DummyDeletePage</h1>;
  DummyDeletePage.displayName = "DummyDeletePage";
  return { default: DummyDeletePage };
});
vi.mock("./presentation/dummy/edit/DummyEditPage", () => {
  const DummyEditPage = () => <h1>DummyEditPage</h1>;
  DummyEditPage.displayName = "DummyEditPage";
  return { default: DummyEditPage };
});

describe("AppRoutes", () => {
  it("renders list dummy page", async () => {
    render(
      <MemoryRouter initialEntries={[DummyRoutes.list]}>
        <AppRoutes />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("DummyListPage")).toBeInTheDocument();
    });
  });

  it("renders create dummy page", async () => {
    render(
      <MemoryRouter initialEntries={[DummyRoutes.create]}>
        <AppRoutes />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("DummyCreate")).toBeInTheDocument();
    });
  });

  it("renders edit dummy page", async () => {
    render(
      <MemoryRouter initialEntries={[DummyRoutes.edit(1)]}>
        <AppRoutes />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("DummyEditPage")).toBeInTheDocument();
    });
  });

  it("renders delete dummy page", async () => {
    render(
      <MemoryRouter initialEntries={[DummyRoutes.delete(1)]}>
        <AppRoutes />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("DummyDeletePage")).toBeInTheDocument();
    });
  });
});
