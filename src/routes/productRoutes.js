import { Router } from "express"
import { AddProduct, DeleteProduct, EditProduct, getAProduct, getProducts, ScanProduct } from "../controllers/products.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const ProductRoute = Router();
ProductRoute.post('/', AuthMiddleware, AddProduct).get('/', AuthMiddleware, getProducts).put('/:id', EditProduct)
.delete('/:id', AuthMiddleware, DeleteProduct).post('/scan', AuthMiddleware, ScanProduct).get('/:id', AuthMiddleware, getAProduct)
export default ProductRoute