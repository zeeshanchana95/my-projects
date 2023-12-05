import express from "express";
import bodyparser from "body-parser";
import cors from "cors";

import { SERVERPORT } from "./config.js";

import ToDoRouter  from "./routes/ToDoRouter.js";

const app = express();
const PORT = SERVERPORT || 3030;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "On main route" });
});

app.use("/todos", ToDoRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
