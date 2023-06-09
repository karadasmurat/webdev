import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import MealsApp from "./components/context/MealsApp.tsx";
import VideoDemo from "./components/VideoDemo.tsx";
import ReducerDemo from "./components/ReducerDemo.tsx";
import FetchDemo from "./components/FetchDemo.tsx";
import Rating from "./components/Rating.tsx";
import RatingDemo from "./components/Rating.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RatingDemo />
    {/* <MealsApp /> */}
    {/* <VideoDemo /> */}
    {/* <FetchDemo /> */}
    {/* <ReducerDemo /> */}
  </React.StrictMode>
);
