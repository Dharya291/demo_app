import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppProvider, Frame } from "@shopify/polaris";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <Frame>
        <App />
      </Frame>
    </AppProvider>
  </StrictMode>
);
