import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import App from "./App";
import { history, store } from "./app/store";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <>
    <Provider store={store}>
      <Router history={history}>
        <ToastContainer bodyClassName={"hidden lg:block"}></ToastContainer>
        <App />
      </Router>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
