const {Schema, model} = require("mongoose");

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
})

module.exports = model ("User", schema);