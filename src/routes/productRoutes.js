import { Router } from "express"
import { AddProduct, DeleteProduct, EditProduct, getAProduct, getProducts, ScanProduct } from "../controllers/products.js";
import AuthRoute from "./authRoute.js";

const ProductRoute = Router();
ProductRoute.post('/', AuthRoute, AddProduct).get('/', AuthRoute, getProducts).put('/:id', EditProduct)
.delete('/:id', AuthRoute, DeleteProduct).post('/:Qr', AuthRoute, ScanProduct).get('/:id', getAProduct)
export default ProductRoute