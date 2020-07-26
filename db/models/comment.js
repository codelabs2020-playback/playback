const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  timestamp: { type: Number },
  content: { type: String },
  session: { type: Schema.Types.ObjectId, ref: "Session" },
  username: { type: String }
});

module.exports = mongoose.model("Comment", CommentSchema);
