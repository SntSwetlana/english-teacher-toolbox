const {Schema, model, Types} = require ('mongoose')

const schema = new Schema({
    email: {type:String, require:true, unique:true},
    password: {type: String, required: true},
    links: [{type: Schema.Types.ObjectID, ref: 'Link'}]
})
module.exports = model('User',schema)

