import { Router } from "express"
import passport from "passport"
import { UserManager } from "../../models/user.js"
import { comparePass } from "../../utils/criptografia.js"

export const sessionRouter = Router()



  
  sessionRouter.post('/', 
    passport.authenticate('login', {
      failWithError: true
    }),
    function (req, res) {
      res.status(201).json({ status: 'success', payload: req.user })
    },
    function (error, req, res, next) {
      res
        .status(401)
        .json({
          status: 'error',
          message: 'login failed'
        })
    
    // try {
    //   const email = req.body.email
    //   const password = req.body.password
  
    //   let datosUsuario
  
    //   if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    //     datosUsuario = {
    //       email: 'admin',
    //       name: 'admin',
    //       lastname: 'admin',
    //       rol: 'admin'
    //     }
    //     console.log("Bienvenido Admin")
    //   } else {
    //     const usuario = await UserManager.findOne({ email }).lean()
  
    //     if (!usuario) {
    //       return res.redirect("/login")
    //     }
  
    //     if (!comparePass(password, usuario.password)) {
    //       return res.redirect("/login")

    //     }
  
    //     datosUsuario = {
    //       email: usuario.email,
    //       name: usuario.name,
    //       lastname: usuario.lastname,
    //       rol: 'usuario'
    //     }
    //     req.login(datosUsuario, error =>{
    //       if (error) {
    //         return res.redirect("/login")
    //       }
    //       console.log("Log succes")
    //      return res.redirect("/index")
    //     })
      } 

  
    
    //   req.session['user'] = datosUsuario
      
    //  res.status(200).redirect("/")
     
  //   } catch (error) {
  //     return res.redirect("/login")    }
  // }
  )

  sessionRouter.delete('/', async (req, res) => {
    req.session.destroy(err => {
        return res.status("ok")
     })})
        
  
 