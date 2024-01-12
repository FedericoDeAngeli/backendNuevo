import express from 'express';
import { urlencoded, json } from 'express';
import mongoose from 'mongoose';
import {engine} from "express-handlebars"

import { productRouter } from './routers/api/productRouter.js';
import { cartRouter } from './routers/api/cartRouter.js';
import { sessionRouter } from './routers/api/sessionRouter.js';
import { userRouter } from './routers/api/userRouter.js';



import { webRouter } from './routers/web/webRouter.js';
import { apiRouter } from './routers/api/apiRouter.js';

import{MONGODB_CNX_STRING, SESSION_SECRET, PORT} from "./config.js";




import { sesiones } from './middlewares/sesiones.js';
import { autenticacion } from './middlewares/passport.js';


 
 
 await mongoose.connect(MONGODB_CNX_STRING)
 console.log("Conectado a base de datos")

const app = express();

app.use(sesiones)
app.use(autenticacion)

app.engine("handlebars", engine())
app.set("views", "./views");
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// app.use("/api/productos", productRouter)
// app.use("/api/cart", cartRouter)

app.use("/", webRouter)
app.use("/static", express.static("./static"))
app.use("/api", apiRouter)
// app.use("/api/sesiones", sessionRouter)
// app.use("/api/usuarios", userRouter)



const server = app.listen(PORT, ()=>{
    console.log("Conectado al puerto 8080")
})

