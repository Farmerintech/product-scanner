import { Router } from "express"
import { AddProduct, DeleteProduct, EditProduct, ScanProduct } from "../controllers/products.js";

const ProductRoute = Router();
ProductRoute.post('/', AddProduct).put('/:id', EditProduct)
.delete('/:id', DeleteProduct).post('/:Qr', ScanProduct)
export default ProductRoutes