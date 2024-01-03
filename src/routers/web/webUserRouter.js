import { Router } from "express"
import passport from "passport"

export const userRouter = Router()

userRouter.get('/register', function registerView(req, res) {
    res.render('registro.handlebars', {
      titulo: 'Registro'
    })
  })

  userRouter.post('/register',
  passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register',
  })
)