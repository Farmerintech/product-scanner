import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./src/config/db.js";
import AuthRoute from "./src/routes/authRoute.js";
import UserRoute from "./src/routes/userRoute.js";
import cors from "cors";
import ProductRoute from "./src/routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors({ origin: true }));
app.use(
  cors({
    origin: ["https://localhost:5173", "*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());



connectDB();

app.use(express.static("client"));
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/products", ProductRoute);

app.listen(PORT, () => {
  console.log(`Server starts at PORT at ${PORT}`);
});
