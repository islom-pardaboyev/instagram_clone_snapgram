import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MainContext } from "./context/Context.tsx";
import { Provider } from "react-redux";
import {store} from './redux'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MainContext>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </MainContext>
  </Provider>
);
