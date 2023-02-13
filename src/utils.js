import {fileURLToPath } from 'url'
import {dirname} from 'path'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from './config/credentials.js'
///Esto es para las rutas relativas

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname 

//Configuración para hasheo

export const createHash = (password)=> bycrypt.hashSync(password, bycrypt.genSaltSync(10))
 
//Función para validar contraseña

export const isValidPassword = (user, password)=>{
    return bycrypt.compareSync(password, user.password)
}

//Configurando JWT

export const generateToken = (user)=>{
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn:'24h'})
    return token    
}

export const authToken = (req, res, next)=>{
    const authHeader = req.cookies.userToken
    if (!authHeader) return res.status(401).send({error:'Not auth'})

    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, credential)=>{
        if(error) return res.status(403).send({error: 'not authorized'})
        req.user = credential.user
        next()
    })
}   