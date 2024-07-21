import express from "express";
import { get, identity, merge } from "lodash";
import { getUsersBySessionToken } from "../db/user";

const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies[process.env.SECRET];
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        const existingUser = await getUsersBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }
        merge(req, { identity: existingUser });
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id") as string;

        if(!currentUserId){
            return res.sendStatus(403);
        }
        if(currentUserId != id){
            return res.sendStatus(403);
        }

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export {
    isAuthenticated,
    isOwner
}