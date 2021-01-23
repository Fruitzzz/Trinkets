const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  tags: { type: [], default: [] },
  optionalFields: { type: [], default: null },
  collectionTitle: { type: String, required: true },
  collectionId: { type: Types.ObjectId, ref: "Collection" },
  ownerId: {type: Types.ObjectId, ref:"User"},
  likes: {type: [Types.ObjectId], default: []},
  comments: {type: [], default: []},
  creationDate: {type: Date, default: Date.now()}
});
module.exports = model("Item", schema);