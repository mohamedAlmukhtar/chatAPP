const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const serverModel = require('./models/server.js')
const userModel = require('./models/user.js')
const Pusher = require('pusher')
const path = require('path');
require('dotenv').config()

//app config
const app = express()
const port = process.env.PORT || 5000
const buildPath = path.join(__dirname, 'frontend', 'build')

const pusher = new Pusher({
    appId: process.env.PUSHER_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "us3",
    useTLS: true
});

//middlewares
app.use(express.static(buildPath))
//app.use(express.json())
//app.use(cors())


//db config

//db config
const mongoURI = `mongodb+srv://admin:${process.env.MONGO_PASS}@cluster0.isjsj.mongodb.net/chatDB?retryWrites=true&w=majority`


mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB connected')

    const changeStream = mongoose.connection.collection('servers').watch()

    changeStream.on('change', (change) => {
        if(change.operationType === 'insert') {
            console.log("Insert")
            pusher.trigger("servers", "newServer", {
                'change': change
            })
        } else if (change.operationType === 'update') {
            console.log('an UPDATE')
            pusher.trigger("channels", "newChannel", {
                'change': change
            });
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

//Helper functions

const updateUser = (userId, serverId) => {
    console.log("user:")
    console.log(userId)
    console.log(serverId)
    return new Promise((resolve, reject) => {
        //update servers array in user
        userModel.updateOne(
            {_id: userId},
            {$push: { servers: serverId }},
            (err, data) => {
                if(err){
                    console.log("error joining server")
                    console.log(err)

                    return reject(err)
                } else {
                    resolve(data)
                    
                }
            }
        )
    })

}


const updateServer = (userId, serverId) => {

    return new Promise((resolve, reject) => {
        //update users array in server
        serverModel.updateOne(
            {_id: serverId},
            {$push: { users: userId }},
            (err, data) => {
                if(err){
                    console.log("error joining server")
                    console.log(err)

                    return reject(err)
                } else {
                    resolve(data)
                }
            }
        )
    })

}


//api routes
app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

app.post('/new/server', (req, res) => {
    const userId = req.body.userId
    const serverData = req.body.server

    serverModel.create(serverData, async (err, server) => {
        if(err){
            res.status(500).send(err)
        } else {
            await updateUser(userId, server._id)
                .then(data => { res.status(201).send({ data, server }) })
                .catch(err => { res.status(500).send({ err, server }) })

            
        }
    })
})

app.put('/update/server', async (req, res) => {
    try{
        const server = await serverModel.findById(req.body.serverId).exec()
        server.set(req.body.server)
        const result = await server.save()
        res.status(200).send(result)
    } catch(error) {
        res.status(500).send(error)
    }
})

app.post('/join/server', async (req, res) => {
    const userId = req.body.userId
    const serverId = req.body.serverId
    let result = []

    await updateUser(userId, serverId)
        .then(data => { result.push(data) })
        .catch(err => { result.push(err) })

    await updateServer(userId, serverId)
        .then(data => { result.push(data) })
        .catch(err => { result.push(err) })

    res.status(201).send(result)

})

app.get('/get/serverList', async (req, res) => {

    try{
        const user = await userModel.findOne({ _id: req.query.userId })
        try{
            const servers = await serverModel.find({ '_id': { $in: user.servers } })
            res.status(200).send(servers)
        } catch (err) {
            res.status(500).send("No servers")
        }
    } catch (err) {
        console.log('Tough luck')
        res.status(500).send("User not found")
    }

})

app.post('/new/channel', (req, res) => {
    
    const channel = req.body.channel

    serverModel.updateOne(
        {_id: req.body.serverId},
        {$push: { channels: channel }},
        (err, data) => {
            if(err){
                console.log("error creating channel")
                console.log(err)

                res.status(500).send(err)
            } else {
                res.status(201).send(data)
            }
        }
    )

})


app.get('/get/channelList', async (req, res) => {

    try{
        const server = await serverModel.findOne({ _id: req.query.serverId })
        res.status(201).send(server.channels)
    } catch (err) {
        res.status(500).send(err)
    }

})

app.post('/register', (req, res) => {
    userModel.findOne({ username: req.body.username }).exec((err, user) => {
        if(user){
            res.status(500).send("username already exists")
        } else {
            userModel.findOne({ email: req.body.email }).exec((err, user) => {
                if(user){
                    res.status(500).send("email already exists")
                } else {
                    console.log("I am getting there")
                    var newUser = new userModel({
                        username: req.body.username,
                        email: req.body.email,
                    })

                    newUser.password = newUser.generateHash(req.body.password)
                    newUser.save();

                    res.status(201).send(newUser)
                }
            })
        }
    })
})

app.post('/login', (req, res) => {
    userModel.findOne({ email: req.body.email }).exec((err, user) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        } else {
            if(user){
                userInfo = user
                if(!userInfo.username){
                    userInfo.username = req.body.username
                }

                if(!userInfo.photo){
                    userInfo.photo = req.body.photo
                }
                res.status(200).send(userInfo)
            } else {
                console.log('not found')
                var newUser = new userModel({
                    _id: req.body.userId,
                    email: req.body.email,
                    displayName: req.body.username,
                })

                newUser.save();
                userInfo = {
                    _id: newUser._id,
                    email: req.body.email,
                    username: req.body.username,
                    photo: req.body.photo,
                }
                res.status(201).send(userInfo)
            }
            
        }
    })
})

app.get('/get/userList', async (req, res) => {

    try{
        const server = await serverModel.findOne({ _id: req.query.serverId })
        try{
            const users = await userModel.find({ '_id': { $in: server.users } })
            console.log(users)
            res.status(200).send(users)
        } catch(err) {
            res.status(500).send(err)
        }
    } catch(err) {
        res.status(500).send(err)
    }

})

app.get('/get/serverOwner', async (req, res) => {

    try{
        const user = await userModel.findOne({ _id: req.query.userId })
        res.status(200).send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})

app.get('/get/conversation', async (req, res) => {

    let found = false

    try{
        const server = await serverModel.findOne({ _id: req.query.serverId })
        try{
            server.channels.map((channel) => {
                if(channel._id == req.query.channelId){
                    found = true
                    res.status(201).send(channel.conversation.reverse())
                }
            })

            if(!found){
                res.status(500).send("channel not found")
            }
        } catch(err){
            res.status(500).send(err)
        }
    } catch(err) {
        res.status(500).send(err)
    }

})

app.post('/new/message', async (req, res) => {

    let found = false

    try{
        const server = await serverModel.findOne({ _id: req.body.serverId })
        try{
            server.channels.map((channel) => {
                if(channel._id == req.body.channelId){
                    found = true
                    channel.conversation.push(req.body.message)
                    server.save()
                    res.status(200).send("message added")
                }
            })

            if(!found){
                res.status(500).send("channel not found")
            }
        } catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }

})


//listen
app.listen(port, () => console.log(`Server is running on port: ${port}`))
