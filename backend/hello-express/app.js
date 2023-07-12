// The app object conventionally denotes the Express application.
// const express = require("express");
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, there!");
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
