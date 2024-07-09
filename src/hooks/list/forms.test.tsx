import { renderHook } from "@testing-library/react";

import type { List } from "@/domain/list/types";
import { useFormCreateList, useFormUpdateList } from "@/hooks/list/forms";
import AppWrapper from "@/utils/test/AppWrapper";

describe("useFormCreateList", () => {
  it("should return an object with the expected properties", () => {
    const { result } = renderHook(() => useFormCreateList(), { wrapper: AppWrapper });
    expect(result.current).toHaveProperty("handleSubmit");
    expect(result.current).toHaveProperty("reset");
    expect(result.current).toHaveProperty("watch");
    expect(result.current).toHaveProperty("trigger");
    expect(result.current).toHaveProperty("control");
  });
});

describe("useFormUpdateList", () => {
  it("should return an object with the expected properties", () => {
    const list: List = {
      id: "1",
      name: "name",
      user: "user",
      created_at: new Date(),
    };
    const { result } = renderHook(() => useFormUpdateList(list), { wrapper: AppWrapper });
    expect(result.current).toHaveProperty("handleSubmit");
    expect(result.current).toHaveProperty("reset");
    expect(result.current).toHaveProperty("watch");
    expect(result.current).toHaveProperty("trigger");
    expect(result.current).toHaveProperty("control");
  });
});
