const {Schema, model} = require("mongoose");

const schema = new Schema({
    subjects: {type: [String], default: []}
})

module.exports = model("Subjects", schema);