const express = require("express");
const User = require("../models/User");
const Collection = require("../models/Collection");
const { check, validationResult } = require("express-validator");
const Subject = require("../models/Subjects");
const Item = require("../models/Item");
const { cloudinary } = require("../utils/cloudinary");
const auth = require("../middleware/verify.middleware");
const router = express.Router();
const fail = { msg: "serverFail" };
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json([...users]);
  } catch (e) {
    res.status(500).json(fail);
  }
});
router.post("/block", auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    user.set({ isBlocked: !user.isBlocked });
    await user.save();
    const users = await User.find();
    res.status(201).json([...users]);
  } catch (e) {
    res.status(500).json(fail);
  }
});
router.post("/delete", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    const imagesTodelete = await Collection.find({ ownerId: user._id });
    imagesTodelete.forEach((collection) => {
      if (!isDefault(collection.imageId)) {
        cloudinary.uploader.destroy(collection.imageId);
      }
    });
    await Collection.deleteMany({ ownerId: user._id });
    await Item.deleteMany({ ownerId: user._id });
    const users = await User.find();
    res.status(201).json([...users]);
  } catch (e) {
    res.status(500).json(fail);
  }
});
router.post("/swap", auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    user.set({ isAdmin: !user.isAdmin });
    await user.save();
    const users = await User.find({});
    res.status(201).json([...users]);
  } catch (e) {
    res.status(500).json(fail);
  }
});
router.post(
  "/addSubject",
  auth,
  [check("name", "enterSubjectName").notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          msg: errors.array()[0].msg,
        });
      }
      const newSubject = new Subject({ name: req.body.name });
      newSubject.save();
      const subjects = await Subject.find();
      const subjectsNames = subjects.map((subject) => subject.name);
      res.status(201).json([...subjectsNames]);
    } catch (e) {
      res.status(500).json(fail);
    }
  }
);
router.post("/deleteSubject", auth, async (req, res) => {
  try {
    await Subject.deleteOne({ name: req.body.name });
    const subjects = await Subject.find();
    const subjectsNames = subjects.map((subject) => subject.name);
    res.status(201).json([...subjectsNames]);
  } catch (e) {
    res.status(500).json(fail);
  }
});
const isDefault = (imageId) => {
  return imageId === "r8tpac1kmsgzqndept2i";
};
module.exports = router;
