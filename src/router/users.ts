import { Router } from "express";
import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import  { isAuthenticated, isOwner } from "../middlewares";


const users = (router: Router)=>{
    router.get("/users", isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.put("/users/:id", isAuthenticated, isOwner, updateUser )
}

export default users;
