import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    Qrcode:{
        type:String,
        required:true,
    },
    manufacturer:{
        type:String,
    },
})

export const ProductModel = mongoose.model("products", ProductSchema)