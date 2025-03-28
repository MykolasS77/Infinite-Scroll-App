import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SavedPhotosContextProvider } from "./imageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <SavedPhotosContextProvider>
    <App />
  </SavedPhotosContextProvider>
);
