import express from "express";
import { DATA } from "../data/serverData.js";

const ToDoController = {
  log() {
    console.log("here");
  },
  getData() {
    return DATA;
  },
  updateData(detail) {
    DATA.push(detail);
  },
};

export default ToDoController;
