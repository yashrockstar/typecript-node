import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, getUser, updateUser, deleteUser } from "../service/user.service";
import log from "../logger";

var mongoose = require('mongoose');

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (e: any) {
        log.error(e);
        return res.status(409).send(e.message);
    }
}

export async function getUserHandler(req: Request, res: Response) {
    try {
        const user = await getUser(mongoose.Types.ObjectId(req.params.userId));
        if (user != null) {
            return res.send(omit(user.toJSON(), "password"));
        } else {
            return res.send("user is not present in database");
        }
    } catch (e: any) {
        log.error(e);
        return res.status(409).send(e.message);
    }
}

export async function updateUserHandler(req: Request, res: Response) {
    try {
        const user = await updateUser(mongoose.Types.ObjectId(req.params.userId), req.body);
        if (user != null) {
            return res.send(omit(user.toJSON(), "password"));
        } else {
            return res.send("user is not present in database");
        }
    } catch (e: any) {
        log.error(e);
        return res.status(409).send(e.message);
    }
}

export async function deleteUserHandler(req: Request, res: Response) {
    try {
        const user = await deleteUser(req.params.userId);
        if (user != null) {
            const resJson = {
                "user": omit(user.toJSON(), "password"),
                "deleted": true
            }
            return res.send(resJson);
        } else {
            return res.send("user is not present in database");
        }
    } catch (e: any) {
        log.error(e);
        const resJson = {
            "message": e,
            "deleted": false
        }
        return res.send(resJson);
    }
}