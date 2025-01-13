import bcrypt from "bcrypt"
import { UserModel } from "../models/auth.model.js";
import jwt from "jsonwebtoken"

export const Register = async (req, res) =>{
    try {
        const {username, email, password} = req.body
        //check if the username or email already exist
        const existingUser = await UserModel.findOne({
            $or:[
                {username},
                {email}
            ]
        });
        if(existingUser && existingUser.username === username){
            return res.status(401).json({message:"Username already taken"})
        }else {
            if(existingUser && existingUser.email === email){
                return res.status(401).json({message:"Email already exist"})
            }
        }
        if(!username || !email || !password){
            return res.status(401).json({message:"Username, email or password is required"})
        }
        //salt round and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPsw = await bcrypt.hash(password, salt)
        await UserModel.create({
            username,
            email,
            password:hashedPsw
        })
        return res.status(201).json({message:"Registration successful, you are being redirected to login"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal error, Your backend guy is sleeping", error})
    }
}
export const Login = () =>{
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(401).json({message:"Username, and password is required"})
        }
        const user = UserModel.findOne({username});
        if(!user){
            return res.status(404).json({message:"Username does not exist"})
        }
        const correctPsw = bcrypt.compare(password, user.password);
        if(!correctPsw){
            return res.status(401).json({message:"Incorrect password"}) 
        }
        const token = jwt.sign(
            {
                _id:user._id,
                email:user.email,
                username:user.username
            },
            process.env.SECRET_KEY,
            {
                expiresIn:process.env.LIFE_TIME
            }
        )
        return res.status(200).json({message:"Login successful", user:{_id, email, username, token}})
    } catch (error) {
        return res.status(500).json({message:"Internal error, Your backend guy is sleeping", error})
    }
}


export const updatePassword = async(req, res) => {
    try {
        const username= req.user.username
        const {oldPassword, newPassword} = req.body
        const user = await UserModel.findOne({username});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const _id = user._id
        const matchedPassword = await bcrypt.compare(oldPassword, user.password)
        if(!matchedPassword){
            return res.status(400).json({message:"Your initial password is incorrect"})
        }
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPasswod = await bcrypt.hash(newPassword, saltRounds)
        await UserModel.findByIdAndUpdate(_id, {password:hashedPasswod}, {new:true})
        return res.status(201).json({message:"Password updated successfully.."})

    } catch (error) {
        return res.status(500).json({message:"Internal error, Your backend guy is sleeping", error})
    }
}
