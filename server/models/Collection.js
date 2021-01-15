const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  ownerId: { type: Types.ObjectId, ref: "User" },
  ownerName: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  pictureURL: { type: String, default: "" },
  optionalFields: { type: [], default: null },
});
module.exports = model("Collection", schema);
