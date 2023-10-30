const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  parts: {
    type: String,
    required: false,
  },
  possibleAnswers: {
    type: String,
    required: false,
  },
  options: {
    type: [String],
    required: false,
  },
  correctAnswer: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ["mcq", "frq", "frq-short"],
    required: true,
  },
  metadata: {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    subunit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subunit",
      required: true,
    },
  },
});

let Problem;
if (mongoose.models.Problem) {
  Problem = mongoose.model("Problem");
} else {
  Problem = mongoose.model("Problem", ProblemSchema);
}

module.exports = Problem;
