const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  tags: { type: [String], default: [] },
  optionalFields: { type: [], default: null },
  collectionName: { type: String, required: true },
  collectionId: { type: Types.ObjectId, ref: "Collection" },
});
module.exports = model("Item", schema);