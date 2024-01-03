import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { UserManager } from "../models/user.js";
import { githubCallbackUrl, githubClientSecret, githubClienteId } from "../config.js";

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  },
  async (req, _u, _p, done) => {
    try {
      const datosUsuario = await UserManager.registrar(req.body)
      done(null, datosUsuario)
    } catch (error) {
      done(null, false, error.message)
    }
  }))

  passport.use('login', new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try {
      const datosUsuario = await UserManager.autenticar(email, password)
      done(null, datosUsuario)
    } catch (error) {
      return done(null, false, error.message)
    }
  }))

  passport.use('github', new GitHubStrategy({
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl
  }, async function verify(accessToken, refreshToken, profile, done) {
    console.log(profile)
  
    const usuario = await UserManager.findOne({ email: profile.username })
    if (usuario) {
      return done(null, {
        ...usuario,
        rol: 'usuario'
      })
    }
  
    try {
      const registrado = await UserManager.create({
        email: profile.username,
        password: '(sin especificar)',
        name: profile.displayName,
        lastname: '(sin especificar)',
        age: 0
      })
      done(null, {
        ...registrado,
        rol: 'usuario'
      })
    } catch (error) {
      done(error)
    }
  
  }))

passport.serializeUser((user, next)=>{next(null, user)});
passport.deserializeUser((user, next)=>{next(null, user)});

const passportInitialize = passport.initialize()
const passportSession = passport.session();

export function autenticacion(req, res, next) {
    passportInitialize(req, res, ()=> {
        passportSession(req, res, next);
    })
}