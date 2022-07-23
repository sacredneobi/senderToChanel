import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "use-http";
import "./index.css";
import "./localization";
import { TelegramWebApp } from "react-telegram-webapp";
import { adminPages } from "./pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard";

async function validateHash() {
  return true;
}

const options = {
  cachePolicy: "no-cache",
  interceptors: {
    request: async ({ options }) => {
      // console.log(options.headers);
      // options.headers = {
      //   "Content-Type": "application/json",
      // };
      return options;
    },
    // response: (props) => {
    //   return props.response;
    // },
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TelegramWebApp validateHash={validateHash}>
    <Provider options={options}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Dashboard adminPages={adminPages} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </TelegramWebApp>
);
