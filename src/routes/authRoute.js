import { Router } from "express"
import { Login, Register } from "../controllers/auth.js";

const AuthRoute = Router();
AuthRoute.post('/', Register).post('/', Login);
export default AuthRoute