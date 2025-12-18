import { createUser, deleteUser, getUser, loginUser, updateUser } from "../controllers/user";
import { app, verifyJWT } from "../server";

export const registerUser = () => { 
    app.post('/users/register', createUser)
}  

export const authUser = () => { 
    app.post('/auth/login', loginUser)
}  

export const getuserInfo = () => { 
    app.get('/users/me', {preHandler: verifyJWT}, getUser)
}  

export const updateInfoUSer = () => { 
    app.patch('/users/me', {preHandler: verifyJWT}, updateUser)
}  

export const deleteInfoUser = () => { 
    app.delete('/users/me', {preHandler: verifyJWT}, deleteUser)
}  