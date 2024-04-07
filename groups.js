import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    id : Number,
    first_name : String,
    last_name : String,
    email : String,
    gender : String,
    avatar : String,
    domain : String,
    available : Boolean
})

const groupSchema = new mongoose.Schema({
    groupName : String,
    groupMembers : [userSchema]
})