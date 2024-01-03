import { Router} from "express";
import { dbCart } from "../../models/cart.js";
import { randomUUID } from "crypto";

export const cartRouter = Router()

cartRouter.get("/", async (req, res) => {
    const carritos = await dbCart.find().populate("product.pid").lean()
    res.json({carritos})})

cartRouter.get("/:id", async (req, res) =>{
    const id = req.params.id
    try { 
        const carritos = await dbCart.findById(id).populate("product.pid").lean()
        res.json(carritos)  
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
})

cartRouter.post("/", async (req, res) => {
    const datosCart = req.body
    datosCart._id = randomUUID()
    
    try {
        const cartAgregado = await dbCart.create(datosCart)
    res.json(cartAgregado.toObject())
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
})

cartRouter.post("/:id/product/:pid", async (req,res)=>{
    const pId = req.params.pid
    const id = req.params.id
    try {
        const CartFind = await dbCart.findById(id)
        if (CartFind){
            const productInCart =  CartFind.product.find(product => product.pid === pId)
            if(!productInCart){
                await dbCart.findByIdAndUpdate(id,
                    {$push: {product: {pid: pId, quantity: 1}}},
                    {new: true}).lean()
            }else{
               const updateCart = await dbCart.findOneAndUpdate( 
                { _id: id, 'product.pid': pId },
               { $inc: { 'product.$.quantity': 1 } },
               { new: true }).lean()
              res.json(updateCart)
            }
        }
       
    } catch (error) {
        res.json({
            status: "error",
            message: error.message})
    }
})

cartRouter.delete("/:id/product/:pid", async (req, res) => {
    const pId = req.params.pid
    const id=req.params.id
    try {
        const cartId = await dbCart.findById(id)
        if(!cartId){
            res.send("Carrito no encontrado por id")
        }
        const  idProduct = cartId.product.find(product => product.pid === pId)
        if(!idProduct){
            res.send("Producto no encontrado en el carrito")
        }
        await dbCart.findByIdAndUpdate(id,
            { $pull: { product: { pid: pId }}},
            { new: true }).lean()   

            res.json({status: "ok"})
} catch (error) {
    res.json({
        status: "error",
        message: error.message})
}})

cartRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
   try {
    const cartId = await dbCart.findById(id)
    if(!cartId){
       res.send ("Carrito no encontrado")
    }else{
       await dbCart.findByIdAndDelete(id)
    }
   } catch (error) {
    res.json({status: "error", message: error.message})
   }
    
    
})

cartRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const nuevoProducto = req.body
     await dbCart.findByIdAndUpdate(id,
        {$push: nuevoProducto},
        {new: true}).lean()})


