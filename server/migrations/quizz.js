var mongoose = require('mongoose')

var quiz = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        name: {
            type: String
        }
    },
    questions: {
        type: Array 
        /*

            Name:
            Answer: [
                {text}
                {solution}
            ]
        */
    },
    totalCompletions: {
        type: Number,
        default: 0
    }
},
{
    collection: 'quizzes'
})

module.exports = mongoose.model("Quiz", quiz)