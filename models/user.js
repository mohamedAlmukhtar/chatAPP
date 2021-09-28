const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Server = require('./server.js')

const userSchema = mongoose.Schema({
    displayName: String,
    username: String,
    password: String,
    email: String,
    photo: String,
    servers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Server' }]
})

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('user', userSchema)