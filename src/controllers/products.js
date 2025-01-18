import { ProductModel } from "../models/productModel.js";

// Add a new product
export const AddProduct = async (req, res) => {
    try {
        const { name, Qrcode, manufacturer } = req.body;
        const alreadyAdded = await ProductModel.findOne({name, Qrcode})
        if(alreadyAdded){
            return res.status(401).json({ message: "Product already exist in the database, edit instead" });
        }
        if (!name || !Qrcode) {
            return res.status(400).json({ message: "Please enter product name and QR code." });
        }

        const NewProduct = await ProductModel.create({
            name,
            Qrcode,
            manufacturer
        });

        return res.status(201).json({ message: "New product posted successfully.", NewProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getProducts = async (req, res) =>{
    try {
        const products = await ProductModel.find();
        if(!products){
          return res.status(404).json({message:"Empty product"})
       }
       return res.status(200).json({message:"products retrieved", products})
    } catch (error) {
        return res.status(500).json({ message: error.message });  
    }
}

export const getAProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if product exists
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        return res.status(200).json({ message: "Product updated successfully.", product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Edit an existing product
export const EditProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if product exists
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Update the product
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
            new: true // Return the updated document
        });

        return res.status(200).json({ message: "Product updated successfully.", updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete an existing product
export const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if product exists
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Delete the product
        await ProductModel.findByIdAndDelete(id);

        return res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const ScanProduct = async (req, res) => {
    try {
        const { Qrcode } = req.body; // Get 'name' from request body

        // Search for a product matching the QR code or name
        const product = await ProductModel.findOne({
            Qrcode
        });

        if (!product) {
            return res.status(404).json({
                message: "Sorry, we do not have this product in our database. Hopefully, we will update our database soon."
            });
        }

        // Check if the QR code matches but the name does not
     
        if (product.Qrcode !== Qrcode) {
            return res.status(200).json({
                message: `The QR code scanned does not match any product.`,
                product,
                status:"Not valid",
                scannedAt:new Date()

            });
        }

        // Check if both QR code.
        if (product.Qrcode === Qrcode) {
            return res.status(200).json({
                message: `Product scanned matched "${product.name}" and checked successfully.`,
                product,
                status:"Valid",
                scannedAt:new Date()
            });
        }

    } catch (error) {
  
        return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};
