import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import { router } from "./routes";

const app = express();

app.use(json());
// parse json request body!
app.use(express.json({ limit: "50mb" }));

//Routing to the api
app.use(router);

app.get("*", (req, res) => {
  res.send("Hi There!");
});

export { app };
