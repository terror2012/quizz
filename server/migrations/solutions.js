var mongoose = require('mongoose')

var solution = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
},
{
    collection: "solutions"
})

module.exports = mongoose.model("Solution", solution)