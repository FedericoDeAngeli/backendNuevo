import { Router } from 'express'
import passport from 'passport'
import { UserManager } from '../../models/user.js'
import { hashear } from '../../utils/criptografia.js'
export const userRouter = Router()

// registro




userRouter.post('/',
  
    passport.authenticate("register", {
      failWithError: true,
     }),
    
      (req, res) => {
        res.status(201).json({ status: 'success', payload: req.user })
      },
      (error, req, res, next) => {
        res
          .status(401)
          .json({
            status: 'error',
            message: 'login failed'
          })
      

    // req.body.password = hashear(req.body.password)
    // try {
    //   await UserManager.create(req.body)
    //   res.status(200).redirect("/api/sesiones/login")
    // } catch (error) {
    //   res.status(400).redirect('/api/usuarios/register')
    // }

    // const datosUsuario ={
    //   email: usuario.email,
    //   name: usuario.name,
    //   lastname: usuario.lastname,
    //   age: usuario.age
    // }
    // req.login(datosUsuario, error =>{
    //   if(error){
    //     return res.redirect("/api/usuarios/register")
    //   } 
    //     res.redirect("/")
    // })
  })


