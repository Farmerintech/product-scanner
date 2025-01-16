import { Router } from "express"
import { Login, Register } from "../controllers/auth.js";

const AuthRoute = Router();
AuthRoute.post('/register', Register).post('/login', Login).put('/change_pasword');
export default AuthRoute