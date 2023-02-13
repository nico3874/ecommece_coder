import { Router} from "express";
import passport from "passport";
import usersModel from "../dao/models/users.model.js";
import { isValidPassword, generateToken } from "../utils.js";

const router = Router()



router.post('/login', async(req, res)=>{

    const {email, password} = req.body
    const user = await usersModel.findOne({email:email})

    if(!user) return res.status(400).send({error:'Usuario no existe'})
    if(!isValidPassword(user, password)) return res.status(401).send({error:'Problemas de autenticación'})

    const acces_token = generateToken(user)
    
    res.cookie('userToken', acces_token).send({status:'Success'})
    
    
})



router.get('/current', passport.authenticate('jwt', {session:false}), async(req, res)=>{
    
    console.log(req.user)
    
})

export default router