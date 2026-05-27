import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TennisGame from "../src/components/TennisGame.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TennisGame />
  </StrictMode>,
);
