import { Router } from 'express'
import passport from 'passport'

export const sessionRouter = Router()

sessionRouter.get('/login',  (req, res) =>{
    try {
     res.render('login.handlebars', {
         titulo: 'Login'
       })
    } catch (error) {
     res.json(error.message)
    }
     
   })

//    sessionRouter.post('/login',
//   passport.authenticate('login', {
//     successRedirect: '/index',
//     failureRedirect: '/login',
//   })
// )

sessionRouter.get('/githublogin',
  passport.authenticate('github', { scope: ['user:email'] })
)

sessionRouter.get('/githubcallback',
  passport.authenticate('github', {
    successRedirect: '/index',
    failureRedirect: '/login',
  })
)

// sessionRouter.post('/logout', async (req, res) => {
//     req.session.destroy(err => {
//     return res.redirect("/login")
//   })

 // req.logout(error =>{
 //   if(error){
 //     res.send(error.message)
 //   }
 //   res.redirect("/api/sesiones/login")
 // })
//})