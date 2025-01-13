import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    Qrcode:{
        type:String,
        required:true,
    },
    manufacturer:{
        type:String,
        required:true,
    },
})

export const productModel = mongoose.model("products", ProductSchema)