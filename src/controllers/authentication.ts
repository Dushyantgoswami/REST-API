import express from "express"

import { getUsersByEmail, createUser } from "../db/user";
import { salt, authentication, passwordAuthentication } from "../helpers/index";

enum ResponseStatus {
    created = 201,
    badRequest = 400,
    conflict = 409,
    success = 200,
    unauthorized = 401
}


const register = async (req: express.Request, res: express.Response) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.sendStatus(ResponseStatus.badRequest);
        }

        const existingUser = await getUsersByEmail(email);
        if (existingUser) {
            return res.status(ResponseStatus.conflict).json("User already exists");
        }

        const hashedPassword = authentication(salt, password);

        const user = await createUser({
            username,
            email,
            authentication: {
                password: hashedPassword
            }
        });

        return res.status(ResponseStatus.created).json(user);

    } catch (error) {
        console.log(error);
        return res.sendStatus(ResponseStatus.badRequest);
    }
}

const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(ResponseStatus.badRequest).json("Enter email and password");
        }

        const user = await getUsersByEmail(email).select("+authentication.password");

        if (!user) {
            return res.status(ResponseStatus.conflict).json("Invalid email");
        }

        const hashedPassword = passwordAuthentication(password, user.authentication.password);

        if (!(email == user.email && hashedPassword == true)) {
            return res.status(ResponseStatus.unauthorized).json("Invalid credentials");
        }

        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie(process.env.SECRET, user.authentication.sessionToken, { domain: "localhost", path: "/" });

        res.status(ResponseStatus.success).json("Logged in Successfully");

    } catch (error) {
        console.log(error);
        return res.sendStatus(ResponseStatus.badRequest);
    }
}

export {
    register,
    login
} 