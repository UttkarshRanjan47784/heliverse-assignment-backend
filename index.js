import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import { retrieveAllUsers, addUser, retrieveUser, updateUser, deleteUser, filterUsers, searchUsersFn, searchUsersLn } from './users.js'

env.config()

const port = process.env.PORT || 5000
const app = express();

app.use(cors())
app.use(express.json())

app.get(`/api/users`, retrieveAllUsers)
app.get(`/api/filterusers`, filterUsers)
app.get(`/api/searchusers/fn/:name`, searchUsersFn)
app.get(`/api/searchusers/ln/:name`, searchUsersLn)

// app.get(`/api/searchusers/`, (req, res)=>{
//     res.json({
//         stat : true,
//         msg : [],
//         num : 0
//     })
// })

//backend only routes

app.post(`/api/users`, addUser)
app.put(`/api/users/:id`, updateUser)
app.delete(`/api/users/:id`, deleteUser)
app.get(`/api/users/:id`, retrieveUser)

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})
