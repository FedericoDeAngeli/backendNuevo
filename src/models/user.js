import { Schema, model } from "mongoose";
import {randomUUID} from "crypto"
import { hashear, comparePass } from "../utils/criptografia.js";

export const UserSchema = new Schema({
    _id: {type: String, default: randomUUID},
    name: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true},
    age: { type: Number, required: true},
    password: { type: String, required: true}
},{
    strict: "throw",
    versionKey: false,
    statics:{
        registrar: async function (reqBody) {
            reqBody.password = hashear(reqBody.password)
            const creado = await model("usuarios").create(reqBody)
      
            const datosUsuario = {
              email: creado.email,
              name: creado.name,
              lastname: creado.lastname,
              rol: 'usuario'
            }
      
            return datosUsuario
          },

          autenticar: async function (username, password) {

            let datosUsuario
      
            if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
              datosUsuario = {
                email: 'admin',
                name: 'admin',
                lastname: 'admin',
                rol: 'admin'
              }
            } else {
              const usuario = await model("usuarios").findOne({ email: username }).lean()
      
              if (!usuario) {
                throw new Error('usuario no encontrado')
              }
      
              if (!comparePass(password, usuario['password'])) {
                throw new Error('las contraseñas no coinciden')
              }
      
              datosUsuario = {
                email: usuario['email'],
                name: usuario['nombre'],
                lastname: usuario['apellido'],
                rol: 'usuario'
              }
            }
      
            if (!datosUsuario) {
              throw new Error('usuario no encontrado')
            }
      
            return datosUsuario
          },
         
        }
      
    })

export const UserManager = model("usuarios", UserSchema)