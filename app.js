import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./src/config/db.js";
import AuthRoute from "./src/routes/authRoute.js";

const app = express();
const PORT = process.env.PORT
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})

connectDB();

app.use('/api/v1/auth/register', AuthRoute)
app.listen(PORT, ()=>{
console.log(`Server starts at PORT at ${PORT}`);
})