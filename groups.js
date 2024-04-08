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

const groupSchema = new mongoose.Schema({
    groupName : String,
    groupMembers : [userSchema],
    groupDomains : [String],
    groupIDs : [Number]
})


async function addGroup (req, res) {
    try{
        const groupCollection = mongoose.model('TBGroups', groupSchema);
        await mongoose.connect(process.env.MONGO);
        const results = await groupCollection.find({
            groupName : req.body.groupName
        })
        if (results.length > 0){
            res.json({
                stat : false,
                msg : `Group Name already taken`
            })
            return;
        }
        const newGroup = new groupCollection({...req.body})
        await newGroup.save()
        res.json({
            stat : true
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


async function retrieveAllGroups (req, res) {
    try{
        const groupCollection = mongoose.model('TBGroups', groupSchema);
        await mongoose.connect(process.env.MONGO);
        const results = await groupCollection.find()
        res.json({
            stat : true,
            msg : results,
            num : results.length
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

export { addGroup, retrieveAllGroups }