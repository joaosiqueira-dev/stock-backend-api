import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products";

import { app, verifyJWT } from "../server";

export const registerProduct = () => { 
    app.post('/products/create', {preHandler: verifyJWT}, createProduct)
}  

export const listProducts = () => { 
    app.get('/products', {preHandler: verifyJWT}, getProducts)
}  

export const handleGetProduct = () => { 
    app.get('/products/:id', {preHandler: verifyJWT}, getProductById)
}  

export const handlerUpdateProduct = () => { 
    app.patch('/products/:id', {preHandler: verifyJWT}, updateProduct)
}  

export const removeProduct = () => { 
    app.delete('/products/:id', {preHandler: verifyJWT}, deleteProduct)
}  
