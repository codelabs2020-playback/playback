const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  createdAt: { type: Date },
  roomID: {type: String},
  videoUrl: {type: String},
  pageUrl:{type: String},
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

module.exports = mongoose.model("Session", SessionSchema);
