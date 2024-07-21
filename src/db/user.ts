import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false
        },
        sessionToken: {
            type: String,
            select: false
        }
    }
});

const UserModel = mongoose.model("User", UserSchema);

const getUsers = () => UserModel.find();

const getUsersByEmail = (email: string) => UserModel.findOne({ email });

const getUsersBySessionToken = (sessionToken: string) => UserModel.findOne({ "authentication.sessionToken": sessionToken });

const getUsersById = (id: string) => UserModel.findById(id);

const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

const deleteUserByID = (id: string) => UserModel.findByIdAndDelete(id);

const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

export {
    UserModel,
    getUsers,
    getUsersByEmail,
    getUsersBySessionToken,
    getUsersById,
    createUser,
    deleteUserByID,
    updateUserById
};