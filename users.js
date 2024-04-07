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
        await mongoose.connect(process.env.MONGO);
        let offset = Number(req.query.offset) || 0;
        const number = await userCollection.find().count();
        const results = await userCollection.find().skip(offset).limit(20)
        res.json({
            stat : true,
            msg : results,
            num : number
        })
    } catch (error){
        console.log(error)
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
        let response = await userCollection.findOne().sort({ id : -1 })
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
        let reqUser = await userCollection.findOne({ id:reqID })
        let oldVal = {...reqUser}
        let newUser = {...req.body}

        reqUser.first_name = newUser.first_name? newUser.first_name : reqUser.first_name,
        reqUser.last_name = newUser.last_name? newUser.last_name : reqUser.last_name,
        reqUser.email = newUser.email? newUser.email : reqUser.email,
        reqUser.gender = newUser.gender? newUser.gender : reqUser.gender,
        reqUser.avatar = newUser.avatar? newUser.avatar : reqUser.avatar,
        reqUser.domain = newUser.domain? newUser.domain : reqUser.domain,
        reqUser.available = newUser.available? newUser.available : reqUser.available,
        
        reqUser.save()

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
}

async function deleteUser (req, res) {
    try{
        const userCollection = mongoose.model('TBUsers', userSchema);
        await mongoose.connect(process.env.MONGO)
        let response = await userCollection.findOneAndDelete({
            id : req.params.id
        });
        res.json({
            stat : true,
            msg : response
        })
    } catch (error){
        res.json({
            stat : false,
            msg : error.message
        })
    }
}

async function filterUsers (req, res) {
    try{
        const userCollection = mongoose.model('TBUsers', userSchema);
        await mongoose.connect(process.env.MONGO)
        const number = await userCollection.find().count();
        let query = userCollection.find();
        query =  (req.query.domain)? query.find({
            domain : req.query.domain
        }) : query;
        query =  (req.query.gender)? query.find({
            gender : req.query.gender
        }) : query;
        query =  (req.query.available)? query.find({
            available : req.query.available
        }) : query;
        let offset = Number(req.query.offset) || 0;
        let response = await query.skip(offset).limit(20);
        res.json({
            stat : true,
            msg : response,
            num : number
        })
    } catch (error){
        res.json({
            stat : false,
            msg : error.message
        })
    }
}

async function searchUsersFn (req, res) {
    try{
        const userCollection = mongoose.model('TBUsers', userSchema);
        await mongoose.connect(process.env.MONGO)
        const number = await userCollection.find().count();
        let newRegex = new RegExp(`^${req.params.name}`)
        let offset = Number(req.query.offset) || 0;
        let response = await userCollection.find({
            first_name : newRegex
        }).skip(offset).limit(20)
        res.json({
            stat : true,
            msg : response,
            num : number
        })
    } catch (error){
        res.json({
            stat : false,
            msg : error.message
        })
    }
}

async function searchUsersLn (req, res) {
    try{
        const userCollection = mongoose.model('TBUsers', userSchema);
        await mongoose.connect(process.env.MONGO)
        const number = await userCollection.find().count();
        let newRegex = new RegExp(`^${req.params.name}`)
        let offset = Number(req.query.offset) || 0;
        let response = await userCollection.find({
            last_name : newRegex
        }).skip(offset).limit(20)
        res.json({
            stat : true,
            msg : response,
            num : number
        })
    } catch (error){
        res.json({
            stat : false,
            msg : error.message
        })
    }
}


export { retrieveAllUsers, addUser, retrieveUser, updateUser, deleteUser, filterUsers, searchUsersFn, searchUsersLn }