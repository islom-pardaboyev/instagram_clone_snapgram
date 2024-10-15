import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MainContext } from "./context/Context.tsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MainContext>
      <BrowserRouter>
        <App />
        <ToastContainer theme="colored" />
      </BrowserRouter>
    </MainContext>
  </Provider>
);
