import mongoose from 'mongoose'
import env from 'dotenv'

env.config()

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

async function retrieveAllUsers (req, res) {
    try{
        const userCollection = mongoose.model('TBUsers', userSchema);
        await mongoose.connect(process.env.MONGO)
        let offset = Number(req.query.offset);
        console.log((Number(req.query.size) > 20))
        let size = (req.query.size > 20)? 20 : req.query.size
        const Users = userCollection.find();
        Users.skip(offset).limit(size);
        let results = await Users.exec()
        res.json({
            stat : true,
            msg : results
        })
    } catch (error){
        res.json({
            stat : false,
            msg : error.message
        })
    }
    mongoose.connection.close()
}

async function retrieveUser (req, res) {
    try{
        const userCollection = mongoose.model('TBUsers', userSchema);
        await mongoose.connect(process.env.MONGO)
        let reqID = req.params.id;
        console.log(reqID);
        let reqUser = await userCollection.findOne({
            id : reqID
        })
        res.json({
            stat : true,
            msg : reqUser
        })
    } catch (error){
        res.json({
            stat : false,
            msg : error.message
        })
    }
    mongoose.connection.close()
}

async function addUser (req, res) {
    try{
        const userCollection = mongoose.model('TBUsers', userSchema);
        await mongoose.connect(process.env.MONGO)
        let query = userCollection.findOne().sort({ id : -1 })
        let response = await query.exec();
        let newID = response.id + 1
        const newUser = new userCollection({
            ...req.body,
            id : newID
        });
        await newUser.save()
        res.json({
            stat : true,
            msg : `User created with ID : ${newID}`
        })
    } catch (error){
        res.json({
            stat : false,
            msg : error.message
        })
    }
}

async function updateUser (req, res) {
    try{
        const userCollection = mongoose.model('TBUsers', userSchema);
        await mongoose.connect(process.env.MONGO)
        let reqID = req.params.id;
        console.log(reqID)
        let query = userCollection.findOne().sort({ id : -1 })
        let response = await query.exec();
        let newID = response.id + 1
        const newUser = new userCollection({
            ...req.body,
            id : newID
        });
        await newUser.save()
        res.json({
            stat : true,
            msg : `User created with ID : ${newID}`
        })
    } catch (error){
        res.json({
            stat : false,
            msg : error.message
        })
    }
}



export { retrieveAllUsers, addUser, retrieveUser, updateUser }