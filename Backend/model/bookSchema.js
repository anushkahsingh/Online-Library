const mongoose=require('mongoose')
const bookSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    image_id: mongoose.Schema.Types.String,
    name:mongoose.Schema.Types.String,
    author: mongoose.Schema.Types.String,
    year: mongoose.Schema.Types.String,
    genre:mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String

})

module.exports = mongoose.model('bookSchema',bookSchema)