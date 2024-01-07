const Question = require("../models/questionModel");
const User = require("../models/userModel");

module.exports.addQuestion = async (req, res) => {
  try {
    const { topic, text, options, correctOptionIndex } = req.body;
    const newQuestion = new Question({
      topic,
      text,
      options,
      correctOptionIndex,
    });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    console.error("Error adding question:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.addScore = async (req, res) => {
  try {
    const { username, topic, score } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.scores.push({ topic, score });
    await user.save();

    res.status(200).json({ message: "Score added successfully" });
  } catch (error) {
    console.error("Error adding score:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getLeaderboard = async (req, res) => {
  try {
    const { topic } = req.params;
    const leaderboard = await User.find(
      { "scores.topic": topic },
      { username: 1, scores: { $elemMatch: { topic } } }
    )
      .sort({ "scores.score": -1 })
      .limit(10);

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("Error getting leaderboard:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
