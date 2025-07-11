const express = require("express");
const cors = require("cors");
const app = express();
const { readdirSync } = require("fs");
const { db } = require("./db/db");
// import db from ".db.js";
// import { db } from "db/db.js";
require("dotenv").config();

import path from "path"

const PORT = process.env.PORT;

const _dirname = path.resolve();

//middleawares

app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(_,res) => {
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(" listening to port", PORT);
  });
};

server();
