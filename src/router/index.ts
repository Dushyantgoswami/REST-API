import Router from "express";
import authentication from "./authentication";
import users from "./users"

const router = Router();
authentication(router);
users(router);

export default router;