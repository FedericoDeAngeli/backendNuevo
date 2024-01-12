import { Router } from "express";
import { sessionRouter } from "./sessionRouter.js";
import { userRouter } from "./userRouter.js";
import { cartRouter } from "./cartRouter.js";
import { productRouter } from "./productRouter.js";
import { metodosPersonalizados } from "../../middlewares/metodosPersonalizados.js";
 
export const apiRouter = Router()
apiRouter.use(metodosPersonalizados)

apiRouter.use("/cart", cartRouter)
apiRouter.use("/products", productRouter)
apiRouter.use("/sesiones",sessionRouter)
apiRouter.use("/usuarios", userRouter)