const User = require("../models/User");

const userCheck = async (req, res, next) => {
  try {
    const { name, email, isSocial } = req.body;
    const matchMessage = await searchMatches(name, email);
    const twin = await User.findOne({ name, email });
    if (!isSocial || !twin)
      return matchMessage ? res.status(400).json(matchMessage) : next();
    if (twin.isBlocked) {
      return res.status(400).json({ msg: "userBlocked" });
    }
    req.body.twin = twin;
    next();
  } catch (e) {}
};
const searchMatches = async (name, email) => {
  const twin = await User.findOne({ $or: [{ email }, { name }] });
  if (twin) {
    if (twin.email === email) {
      return { msg: "emailExist" };
    } else {
      return {
        msg: "userExist",
      };
    }
  }
};
module.exports = userCheck;
