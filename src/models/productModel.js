import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    barcode:{
        type:String,
        required:true,
    },
    category:{
        type:String,
    },
    manufacturer:{
        type:String,
    },
})

export const ProductModel = mongoose.model("products", ProductSchema)