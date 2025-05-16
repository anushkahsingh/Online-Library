const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: mongoose.Schema.Types.String,
    password:mongoose.Schema.Types.String,
    username:mongoose.Schema.Types.String,
    role:mongoose.Schema.Types.String
})
module.exports= mongoose.model('userSchema',userSchema);