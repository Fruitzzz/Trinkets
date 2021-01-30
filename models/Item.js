const { Schema, model, Types } = require("mongoose");
const fuzzySearching = require("mongoose-fuzzy-searching");
const schema = new Schema({
  title: { type: String, required: true },
  tags: { type: [], default: [] },
  optionalFields: { type: [], default: null },
  collectionTitle: { type: String, required: true },
  collectionId: { type: Types.ObjectId, ref: "Collection" },
  ownerId: { type: Types.ObjectId, ref: "User" },
  likes: { type: [Types.ObjectId], default: [] },
  comments: { type: [], default: [] },
  creationDate: { type: Date, default: Date.now() },
});
schema.plugin(fuzzySearching, {
  fields: [
    { name: "title", minSize: 3 },
    { name: "collectionTitle", minSize: 5 },
    {
      name: "tags",
      minSize: 3,
      keys: ["tag"],
    },
    {
      name: "comments",
      minSize: 5,
      keys: ["text"],
    },
    {
      name: "optionalFields",
      minSize: 3,
      key: ["text"],
    },
  ],
});
module.exports = model("Item", schema);
