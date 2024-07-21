import bcrypt from "bcrypt"

const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

const authentication = (salt: string, password: string) => {
    return bcrypt.hashSync(password, salt);
}

const passwordAuthentication = (password: string, hashedPassword: string) =>{
    return bcrypt.compareSync(password, hashedPassword);
}

export {
    salt,
    authentication,
    passwordAuthentication
}