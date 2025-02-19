import { Router } from "express"
import { AddProduct, DeleteProduct, EditProduct, getAProduct, getProducts, ScanProduct } from "../controllers/products.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const ProductRoute = Router();
ProductRoute.post('/add_product', AuthMiddleware, AddProduct)
.get('/get_products', AuthMiddleware, getProducts)
.put('/:id', EditProduct)
.delete('/:id', AuthMiddleware, DeleteProduct)
.post('/scan', ScanProduct).get('/:id', AuthMiddleware, getAProduct)
export default ProductRoute