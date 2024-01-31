const { Signup, Login } = require("../controllers/authController");
const {
  getAllTopics,
  getLeaderboard,
  createTopic,
  getQuestionsByTopicName,
  editTopic,
  deleteTopic,
  submitScore,
} = require("../controllers/quizController");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

// Authentication
router.post("/", userVerification);
router.post("/signup", Signup);
router.post("/login", Login);

// Topics
router.get("/topics", getAllTopics);
router.post("/create-topic", createTopic);
router.post("/edit-topic", editTopic);
router.post("/delete-topic/:id", deleteTopic);

// Questions
router.get("/get-question/:topicName", getQuestionsByTopicName);

// Leaderboard
router.get("/leaderboard/:topic", getLeaderboard);

// Score
router.post("/submit-score", submitScore);

module.exports = router;
