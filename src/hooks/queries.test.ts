// import { act, renderHook } from "@testing-library/react";

// import useIntl from "@amiga-fwk-web/components-intl/use-intl";

// import { useGetList, useGetOne, useMutationGeneral } from "./queries";

// jest.mock("@tanstack/react-query", () => ({
//   QueryClient: jest.fn().mockImplementation(() => ({
//     prefetchQuery: jest.fn(),
//   })),
//   useMutation: jest.fn().mockReturnValue({ isLoading: false, mutate: jest.fn(), mutateAsync: jest.fn() }),
//   useQuery: jest.fn().mockReturnValue({ isLoading: false, isError: false, data: {} }),
//   useQueryClient: jest.fn(),
// }));

// jest.mock("@amiga-fwk-web/components-feedback/notifications-provider", () => ({
//   useNotifications: jest.fn().mockImplementation(() => ({
//     error: jest.fn(),
//     success: jest.fn(),
//   })),
// }));
// jest.mock("@amiga-fwk-web/components-intl/use-intl");

// describe("queries", () => {
//   const fn = jest.fn();
//   const key = ["testKey"];

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("useGetList should fetch list", async () => {
//     const { result } = renderHook(() => useGetList({ key: ["testKey"], fn: jest.fn() }));
//     expect(result.current.isLoading).toBeDefined();
//     expect(result.current.isError).toBeDefined();
//     expect(result.current.data).toBeDefined();
//   });

//   it("should fetch one item", async () => {
//     const { result } = renderHook(() => useGetOne({ key: ["testKey"], fn: jest.fn() }));
//     expect(result.current.isLoading).toBeDefined();
//     expect(result.current.isError).toBeDefined();
//     expect(result.current.data).toBeDefined();
//   });

//   it("useMutate should call the mutation function with the provided data", async () => {
//     const data = { foo: "bar" };
//     (useIntl as jest.Mock).mockReturnValue({ formatMessage: () => "es" });
//     const { result } = renderHook(() => useMutationGeneral({ key, fn, properties: {} }));
//     expect(result.current.mutate).toBeDefined();
//     expect(result.current.mutateAsync).toBeDefined();
//     act(() => {
//       result.current.mutate(data);
//       result.current.mutateAsync(data);
//     });
//     expect(result.current.mutate).toHaveBeenCalledWith(data);
//     expect(result.current.mutateAsync).toHaveBeenCalledWith(data);
//   });
// });
