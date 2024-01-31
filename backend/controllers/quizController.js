const Question = require("../models/questionModel");
const Topic = require("../models/topicModel");
const User = require("../models/userModel");

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

module.exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find({}, "name");
    res.status(200).json({ topics });
  } catch (error) {
    console.error("Error getting topics:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getLeaderboard = async (req, res) => {
  try {
    const { topic } = req.params;
    const leaderboard = await User.aggregate([
      { $match: { "scores.topic": topic } },
      { $unwind: "$scores" },
      { $match: { "scores.topic": topic } },
      { $sort: { "scores.score": -1 } },
      { $limit: 10 },
      {
        $group: {
          _id: "$_id",
          username: { $first: "$username" },
          score: { $first: "$scores.score" },
        },
      },
    ]);

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("Error getting leaderboard:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.createTopic = async (req, res) => {
  try {
    const { topicName, topicPicture, questions } = req.body;

    const newTopic = new Topic({
      name: topicName,
      picture: topicPicture,
    });

    await newTopic.save();

    for (const { text, options, correctOptionIndex } of questions) {
      const newQuestion = new Question({
        topic: newTopic._id,
        text,
        options,
        correctOptionIndex,
      });
      await newQuestion.save();
    }

    res.status(201).json({
      message: "Topic and questions added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error creating topic:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getQuestionsByTopicName = async (req, res) => {
  try {
    const { topicName } = req.params;

    const topic = await Topic.findOne({ name: topicName });

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    const questions = await Question.find({ topic: topic._id });

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error getting questions by topic name:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.editTopic = async (req, res) => {
  try {
    const { topicName, topicPicture, questions } = req.body;

    const existingTopic = await Topic.findOne({ name: topicName });

    if (!existingTopic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    // await Topic.findByIdAndUpdate(existingTopic._id, {
    //   picture: topicPicture,
    // });

    await Question.deleteMany({ topic: existingTopic._id });

    // Add/update questions
    for (const { text, options, correctOptionIndex } of questions) {
      const newQuestion = new Question({
        topic: existingTopic._id,
        text,
        options,
        correctOptionIndex,
      });
      await newQuestion.save();
    }

    res.status(200).json({
      message: "Topic and questions updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error editing topic:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteTopic = async (req, res) => {
  try {
    const topicId = req.params.id;

    const existingTopic = await Topic.findById(topicId);

    if (!existingTopic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    await Question.deleteMany({ topic: existingTopic._id });

    await existingTopic.deleteOne();

    res.status(200).json({
      message: "Topic and related questions deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting topic:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.submitScore = async (req, res) => {
  try {
    const { username, topic, score } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingScoreIndex = user.scores.findIndex((s) => s.topic === topic);

    if (existingScoreIndex !== -1) {
      user.scores[existingScoreIndex].score = score;
    } else {
      user.scores.push({ topic, score });
    }

    await user.save();

    res.status(200).json({ message: "Score submitted successfully" });
  } catch (error) {
    console.error("Error submitting score:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
