import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SavedPhotosContextProvider } from "./functionality/context/imageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SavedPhotosContextProvider>
      <App />
    </SavedPhotosContextProvider>
  </StrictMode>
);
