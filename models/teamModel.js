const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeamSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    score: {
        type: Number,
        default: 0
    },
    captain: {
        type: String
    },
    placement: {
        type: Number,
        default: 0
    },
    kills: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Teams', TeamSchema)