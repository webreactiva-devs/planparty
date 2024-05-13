// useRegisterServices.ts
import { useEffect } from "react";

import { registerServices } from "@/services/di";

export function useRegisterServices() {
  useEffect(() => {
    console.log("useEffect");
    registerServices();
  }, []);
}
