import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import { retrieveAllUsers, addUser, retrieveUser, updateUser } from './users.js'

env.config()

const port = process.env.PORT || 5000
const app = express();

app.use(express.json())
app.use(cors())

app.get(`/api/users`, retrieveAllUsers)
app.get(`/api/users/:id`, retrieveUser)
app.post(`/api/users`, addUser)
app.put(`/api/users/:id`, updateUser)

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})