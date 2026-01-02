import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactQueryProvider from "./providers/react-query-provider.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { BrowserRouter } from "react-router";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <NuqsAdapter>
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </NuqsAdapter>
    </ReactQueryProvider>
  </StrictMode>
);
