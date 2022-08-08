const {Schema, model, Types} = require ('mongoose')

const schema = new Schema({
    term: {type:String, required: true},
    definition: {type: String, required: true, unique: true},
    language: {type: String, required: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    owner: {type:Schema.Types.ObjectID, ref: 'User'}
})
module.exports = model('Quizlet',schema)
