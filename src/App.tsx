import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppRoutes } from "@/routes";
import { registerServices } from "@/services/di";
import { Toaster } from "@/shadcn/components/ui/toaster";

import "./index.css";

const queryClient = new QueryClient();

function App() {
  registerServices();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<h2>Loading</h2>}>
          <AppRoutes />
          <Toaster />
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
