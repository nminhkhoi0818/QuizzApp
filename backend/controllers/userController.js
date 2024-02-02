const User = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.verifyUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ success: false });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
    if (err) {
      return res.json({ success: false });
    } else {
      const user = await User.findById(data.userId);
      if (user) return res.json({ success: true, user: user.username });
      else return res.json({ success: false });
    }
  });
};
