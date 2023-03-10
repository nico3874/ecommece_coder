import mongoose from "mongoose";


const usersCollection = 'users'

const usersSchema = mongoose.Schema({
    name:String,
    lastName:String,
    age:Number,
    email:{
        type:String,
        unique: true
    },
    cart_id: String,
    password:String,
    role:{
        type:String,
        default:'user'
    }
    
})

const usersModel = mongoose.model(usersCollection, usersSchema)

export default usersModel