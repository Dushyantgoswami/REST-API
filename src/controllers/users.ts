import express from 'express';
import { deleteUserByID, getUsers, getUsersById } from '../db/user';


const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};

const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserByID(id);

        return res.json(deletedUser);

    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
}


const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUsersById(id);

        user.username = username;

        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}

export {
    getAllUsers,
    deleteUser,
    updateUser
}
