import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['admin', 'manufacturer'],
        default:"admin"
    }
}, {timestamps:true})

export const UserModel = mongoose.model("user", UserSchema);