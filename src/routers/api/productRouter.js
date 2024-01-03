import { Router,json } from "express";
import { dbProductos } from "../../models/product.js";
import { randomUUID } from "crypto";

export const productRouter = Router();

productRouter.use(json())

productRouter.get("/", async (req, res) => {
   try {
    const producto = await dbProductos.find().lean()
    res.json(producto) 
   } catch (error) {
    res.json({
        status: "error",
        message: error.message})
   }
    
})

productRouter.get("/:id", async (req, res) =>{
    const id = req.params.id
    try { 
        const productos = await dbProductos.findById(id).lean()
        res.json(productos)  
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
})

productRouter.post("/", async (req, res) =>{
    const datosProductos = req.body
    datosProductos._id = randomUUID ()

    try {
        const productoAgregado = await dbProductos.create(datosProductos)
res.json(productoAgregado.toObject())
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
})


productRouter.put("/:id", async (req, res) =>{
    const id = req.params.id
    const nuevoProducto = req.body
    try {
         const productId = dbProductos.findById(id)
         if(!productId){
            res.send("Producto no encontrado")
         }
        const nuevoProductoAgregado = await dbProductos.findByIdAndUpdate(id,
            {$set: nuevoProducto},
            {new: true}).lean()
            res.json(nuevoProductoAgregado)
        
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
    
})

productRouter.delete("/:id", async (req, res) =>{
    const id = req.params.id
    try {
        const productId = await dbProductos.findById(id)
        if(!productId){
            res.send("Producto no encontrado")
        }
        await dbProductos.findByIdAndDelete(id)
        res.send("Producto borrado")
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
   
})