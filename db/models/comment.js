const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  timeStamp: { type: Number },
  content: { type: String },
  session: { type: Schema.Types.ObjectId, ref: "Session" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  authorName: { type: String }
});

module.exports = mongoose.model("Comment", CommentSchema);
