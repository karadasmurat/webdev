import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Settings from "./components/Settings.jsx";
import NotFound from "./components/NotFound.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import GameResults from "./components/GameResults.jsx";
import QuestionForm from "./components/QuestionForm.jsx";

// createBrowserRouter is the recommended router for all React Router web projects.
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <SettingsProvider>
        <App />
      </SettingsProvider>
    ),
  },
  {
    path: "/settings",
    element: (
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    ),
  },
  {
    path: "create",
    element: (
      <SettingsProvider>
        <QuestionForm />
      </SettingsProvider>
    ),
  },
  {
    path: "/results",
    element: (
      <SettingsProvider>
        <GameResults />
      </SettingsProvider>
    ),
  },
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={browserRouter} />
  </React.StrictMode>
);
