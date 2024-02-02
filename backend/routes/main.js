const { Signup, Login, Logout } = require("../controllers/authController");
const {
  getAllTopics,
  getLeaderboard,
  createTopic,
  getQuestionsByTopicName,
  editTopic,
  deleteTopic,
  submitScore,
} = require("../controllers/quizController");
const { verifyUser } = require("../controllers/userController");
const router = require("express").Router();

// Authentication
router.post("/", verifyUser);
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

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
