import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./src/config/db.js";
import AuthRoute from "./src/routes/authRoute.js";
import UserRoute from "./src/routes/userRoute.js";
import cors from "cors"
import ProductRoute from "./src/routes/productRoutes.js";
import { AuthMiddleware } from "./src/middlewares/authMiddleware.js";
const app = express();
const PORT = process.env.PORT
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

connectDB();

app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/users', UserRoute)
app.use('/api/v1/add_product', AuthMiddleware, ProductRoute)

app.listen(PORT, ()=>{
console.log(`Server starts at PORT at ${PORT}`);
})