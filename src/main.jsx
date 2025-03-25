import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Girgitton from "./Pages/Girgitton/Girgitton.jsx";
import Oshpaz from "./Pages/Oshpaz/Oshpaz.jsx";
import Menu from "./Pages/Girgitton/Menu.jsx";
import "./Styles/styles.css";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import Total from "./Pages/Dashboard/Total.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/oshpaz" element={<Oshpaz />}></Route>
            <Route path="/girgitton" element={<Girgitton />}></Route>
            <Route path="/client/:id" element={<Menu />} />
            <Route path="/total/:id" element={<Total />} />
            <Route path="/total" element={<Total />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);
