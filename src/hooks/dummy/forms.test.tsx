import { renderHook } from "@testing-library/react";

import type { Dummy } from "@/domain/dummy/types";
import { useFormCreateDummy, useFormUpdateDummy } from "@/hooks/dummy/forms";
import AppWrapper from "@/utils/test/AppWrapper";

describe("useFormCreateJob", () => {
  it("should return an object with the expected properties", () => {
    const { result } = renderHook(() => useFormCreateDummy(), { wrapper: AppWrapper });
    expect(result.current).toHaveProperty("handleSubmit");
    expect(result.current).toHaveProperty("reset");
    expect(result.current).toHaveProperty("watch");
    expect(result.current).toHaveProperty("trigger");
    expect(result.current).toHaveProperty("control");
  });
});

describe("useFormUpdateJob", () => {
  it("should return an object with the expected properties", () => {
    const dummy: Dummy = {
      id: 1,
      name: "name",
      description: "description",
      createdAt: new Date(),
    };
    const { result } = renderHook(() => useFormUpdateDummy(dummy), { wrapper: AppWrapper });
    expect(result.current).toHaveProperty("handleSubmit");
    expect(result.current).toHaveProperty("reset");
    expect(result.current).toHaveProperty("watch");
    expect(result.current).toHaveProperty("trigger");
    expect(result.current).toHaveProperty("control");
  });
});
