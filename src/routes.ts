import { Express, Request, Response } from "express";
import { createUserHandler, getUserHandler, updateUserHandler, deleteUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema } from "./schema/user.schema";

export default function (app: Express) {

    app.post("/api/user", validateRequest(createUserSchema), createUserHandler);

    app.get("/api/user/:userId", getUserHandler);

    app.put("/api/user/:userId", updateUserHandler);

    app.delete("/api/user/:userId", deleteUserHandler);

}