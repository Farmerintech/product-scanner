import { Router } from "express";
import { DeleteUser, getAuser, getUsers, UpdateUser } from "../controllers/user.js";

const UserRoute = Router()

UserRoute.get('/', getUsers).get('/user', getAuser)
.put('/user', UpdateUser).delete('/user', DeleteUser)

export default UserRoute