import { Router } from "express";
import ToDoController from "../controllers/ToDoController.js";
const ToDoRouter = Router();

ToDoRouter.get("/", (req, res) => {
  res.json(ToDoController.getData());
});

ToDoRouter.post("/", (req, res) => {
  const { body } = req;
  body.id= Math.floor(Math.random()*1000)
  ToDoController.updateData(body);
  const _data = ToDoController.getData();
  res.json({ result: _data });
});

export default ToDoRouter;
