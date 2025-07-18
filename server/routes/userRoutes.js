import express, { Router } from "express";
import { create, deleteUser, getAllUsers, getUserById, updateUser } from "../controller/userController.js";

const route = Router();

route.get("/users", getAllUsers);
route.get("/user/:id", getUserById);

route.post("/user", create);

route.put("/update/user/:id", updateUser);

route.delete("/delete/user/:id", deleteUser);

export default route;