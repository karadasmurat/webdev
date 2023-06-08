/* existing imports */
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import RootLayout from "./layouts/RootLayout";
import HelpLayout from "./layouts/HelpLayout";
import { Page3 } from "./pages/SamplePages";
import Faq from "./pages/help/Faq";
import Contact from "./pages/help/Contact";
import TodoApp from "./components/TodoApp";
import Parent from "./components/context/Parent";
import ContextApp from "./components/context/ContextApp";

// layouts

// createBrowserRouter is the recommended router for all React Router web projects.
const browserRouter_v1 = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/portfolio", element: <Portfolio /> },
  { path: "*", element: <NotFound /> },
]);

// Example: /help/faq
// faq is child of help, is rendered inside parent's <Outlet> (<HelpLayout>), and
// help is child of /, HelpLayout rendered inside parent's <Outlet> (<RootLayout>).
const browserRouter_layout = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // has an index route as a child,
      // renders parent layout with index element inside parent's Outlet,
      // when parent route matched exactly (/ )
      { index: true, element: <Home /> },
      {
        path: "todos",
        element: <TodoApp />,
      },
      { path: "portfolio", element: <Portfolio /> },
      {
        path: "help",
        element: <HelpLayout />,
        children: [
          // No index route as a child,
          // renders parent layout with empty outlet when parent route matched exactly (/help)
          { path: "faq", element: <Faq /> },
          { path: "contact", element: <Contact /> },
        ],
      },
      { path: "context", element: <ContextApp /> },
      { path: "complex/path/page3", element: <Page3 /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  // Layout route: A parent route without a path,
  // used exclusively for grouping child routes inside a specific layout.
  // {
  //   element: <SampleLayout />,
  //   children: [
  //     { path: "/page1", element: <Page1 /> },
  //     { path: "/page2", element: <Page2 /> },
  //   ],
  // },
]);

// The easiest way to quickly update to a v6.4 is to get the help from createRoutesFromElements
// so you don't need to convert your <Route> elements to route objects.
const browserRouter_v0 = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<RootLayout />}></Route>)
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter_layout} />
  </React.StrictMode>
);
