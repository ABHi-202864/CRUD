import express, { Router } from "express";
import { create } from "../controller/userController.js";

const route = Router();

route.post("/user", create);

export default route;