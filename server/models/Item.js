const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  tags: { type: [], default: [] },
  optionalFields: { type: [], default: null },
  collectionTitle: { type: String, required: true },
  collectionId: { type: Types.ObjectId, ref: "Collection" },
  likes: {type: [Types.ObjectId], default: []},
  Comments: {type: [], default: []}
});
module.exports = model("Item", schema);