const express = require("express");
const cors = require("cors");
const app = express();
const { readdirSync } = require("fs");
const { db } = require("./db/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const path = require("path");
const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
readdirSync(path.join(_dirname, "backend", "routes")).map((route) =>
  app.use("/api/v1", require(`./routes/${route}`))
);

// Serve React build
app.use(express.static(path.join(_dirname, "frontend", "build")));
app.get("*", (_, res) => {
  res.sendFile(path.join(_dirname, "frontend", "build", "index.html"));
});

// Start server
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port", PORT);
  });
};

server();
