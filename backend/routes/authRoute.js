const { Signup, Login } = require("../controllers/authController");
const {
  getAllTopics,
  getLeaderboard,
  createTopic,
  getQuestionsByTopicId,
  getQuestionsByTopicName,
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

// Questions
router.get("/get-question/:topicName", getQuestionsByTopicName);

router.get("/leaderboard/:topic", getLeaderboard);

module.exports = router;
