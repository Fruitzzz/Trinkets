const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const tokenVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = await User.findById(decoded.userId);
    if (!user || user.isBlocked) throw new Error();
    next();
  } catch (e) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};
module.exports = tokenVerify;
