const mongoose = require('mongoose')

const RegisterSchema = mongoose.Schema({
    userName : String,
    password :String,
    confirmPass :String
})

const UserModal = mongoose.model("user",RegisterSchema);
module.exports =UserModal