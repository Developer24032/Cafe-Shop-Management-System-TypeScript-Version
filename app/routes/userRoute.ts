import { Router } from "express";
import {addNewUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/usersController";

const userRouter = Router();
userRouter.post("/users", addNewUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;