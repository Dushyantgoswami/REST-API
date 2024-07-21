import  { Router }  from "express";
import   { register, login } from "../controllers/authentication";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

export default (app: Router) => {
    app.use(router); 
};
