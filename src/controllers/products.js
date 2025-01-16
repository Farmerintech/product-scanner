import { ProductModel } from "../models/productModel.js"

export const AddProduct = async (req,res) =>{
    try {
        const {name, Qrcode, } = req.body
        if(!name || !Qrcode || !Manufacturer){
            return res.status(400).json({messsage:"please enter product name and Qr code"})
        }
        const NewProduct = await ProductModel.create({
            name,
            Qrcode

        })
        return res.status(201).json({message:"New product posted successfully", NewProduct})
    } catch (error) {
        
    }

}