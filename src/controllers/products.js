import { ProductModel } from "../models/productModel.js";

// Add a new product
export const AddProduct = async (req, res) => {
    try {
        const { name, Qrcode } = req.body;

        if (!name || !Qrcode) {
            return res.status(400).json({ message: "Please enter product name and QR code." });
        }

        const NewProduct = await ProductModel.create({
            name,
            Qrcode,
            Manufacturer
        });

        return res.status(201).json({ message: "New product posted successfully.", NewProduct });
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
        const { Qr } = req.params; // Get 'Qr' from request parameters
        const { name } = req.body; // Get 'name' from request body

        // Search for a product matching the QR code or name
        const product = await ProductModel.findOne({
            $or: [{ Qr }, { name }]
        });

        if (!product) {
            return res.status(404).json({
                message: "Sorry, we do not have this product in our database. Hopefully, we will update our database soon."
            });
        }

        // Check if the QR code matches but the name does not
        if (product.Qrcode === Qr && product.name !== name) {
            return res.status(200).json({
                message: `The QR code scanned matched ${product.name}. Are you sure you entered the correct product name? otherwise, this product is fake`,
                product
            });
        }

        // Check if both QR code and name match
        if (product.Qrcode === Qr && product.name === name) {
            return res.status(200).json({
                message: "Product scanned and checked successfully: original.",
                product
            });
        }

    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};
