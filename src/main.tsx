import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MainContext } from "./context/Context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MainContext>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </MainContext>
);
