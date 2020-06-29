var mongoose = require('mongoose')

var category = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String
    }
},
{
    collection: "categories"
})

module.exports = mongoose.model("Category", category)