/* existing imports */
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import { Page1, Page2, Page3 } from "./pages/SamplePages";
import SigninForm from "./components/auth/SigninForm";
import SignupForm from "./components/auth/SignupForm";

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
      { path: "about", element: <About /> },
      { path: "portfolio", element: <Portfolio /> },

      { path: "complex/path/page3", element: <Page3 /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  // Layout route: A parent route without a path,
  // used exclusively for grouping child routes inside a specific layout.
  {
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <SigninForm /> },
      { path: "signup", element: <SignupForm /> },
    ],
  },
]);

// The easiest way to quickly update to a v6.4 is to get the help from createRoutesFromElements
// so you don't need to convert your <Route> elements to route objects.
const browserRouter_v0 = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<RootLayout />}></Route>)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter_layout} />
  </React.StrictMode>
);
