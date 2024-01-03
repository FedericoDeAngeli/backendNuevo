import { Router } from "express";
import { sessionRouter } from "./sessionRouter.js";
import { userRouter } from "./userRouter.js";
import { cartRouter } from "./cartRouter.js";
import { productRouter } from "./productRouter.js";
 
export const apiRouter = Router()

apiRouter.use("/cart", cartRouter)
apiRouter.use("/products", productRouter)
apiRouter.use("/sesiones",sessionRouter)
apiRouter.use("/usuarios", userRouter)