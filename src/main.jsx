import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/css/index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
