const { Schema, model } = require("mongoose");

const mainSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  task: [
    {
      type: Schema.Types.ObjectId,
      ref: "task",
    },
  ],
});

module.exports = model("user", mainSchema);
