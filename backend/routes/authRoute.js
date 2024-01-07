const { Signup, Login } = require("../controllers/authController");
const {
  getAllTopics,
  getLeaderboard,
} = require("../controllers/quizController");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/", userVerification);
router.post("/signup", Signup);
router.post("/login", Login);

router.get("/topics", getAllTopics);
router.get("/leaderboard/:topic", getLeaderboard);

module.exports = router;
