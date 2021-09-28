const mongoose = require('mongoose')
const User = require('./user.js')

const serverSchema = mongoose.Schema({
    serverName: String,
    serverImage: String,
    serverOwner: mongoose.Schema.Types.ObjectId,
    channels: [
        {
            channelName: String,
            conversation: [
                {
                    message: String,
                    timestamp: { type: Date, default: Date.now() },
                    user: {
                        username: String,
                        photo: String
                    }
                }
            ]
        }
    ],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('server', serverSchema)