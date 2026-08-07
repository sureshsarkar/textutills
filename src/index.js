import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from 'react-hot-toast';
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    <Toaster /> 
  </StrictMode>
);
