import { UserModel } from "../models/auth.model.js"

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        if(!users){
            return res.status(404).json({message:"No user found"})
        }
        return res.status(404).json({message:"All users retrieved", users})
    } catch (error) {
        return res.status(500).json({message:"Seems like your backend guy is sleeping", error})  
    }
}

export const getAuser = async (req, res) =>{
    try {
        const username = req.params.username
        const user = await UserModel.findOne({username})
        if(!user){
            return res.status(404).json({message:"No user found"})
        }
        return res.status(404).json({message:"User retrieved", user})
    } catch (error) {
        return res.status(500).json({message:"Seems like your backend guy is sleeping", error})  
    }
}
export const UpdateUser = async() =>{
    try {
        const username = req.params.username
        const user = await UserModel.findOne({username})
        if(!user){
            return res.status(404).json({message:"No user found"})
        }
        const newUser = UserModel.findByIdAndUpdate(user._id, req.body, {new:true})
        return res.status(404).json({message:"User data Updated"})
    } catch (error) {
        return res.status(500).json({message:"Seems like your backend guy is sleeping", error})  
    }
}
export const DeleteUser = async() =>{
    try {
        const username = req.params.username
        const user = await UserModel.findOne({username})
        if(!user){
            return res.status(404).json({message:"No user found"})
        }
        const newUser = UserModel.findByIdAndDelete(user._id)
        return res.status(404).json({message:"User Deleted..."})
    } catch (error) {
        return res.status(500).json({message:"Seems like your backend guy is sleeping", error})  
    }
}