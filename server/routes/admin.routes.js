const express = require("express");
const User = require("../models/User");
const Collection = require("../models/Collection");
const { check, validationResult } = require("express-validator");
const Subject = require("../models/Subjects");
const Item = require("../models/Item");
const router = express.Router();
const success = { msg: "Успешно" };
const fail = { msg: "Ошибка сервера" };
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json([...users]);
  } catch (e) {
    res.status(500).json(fail);
  }
});
router.post("/block", async (req, res) => {
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
router.post("/delete", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    const collections = await Collection.find({ ownerId: user._id });
    if (collections) {
      collections.forEach(async (collection) => {
        await Item.deleteMany({ collectionId: collection._id });
        await collection.delete();
      });
    }
    const users = await User.find();
    res.status(201).json([...users]);
  } catch (e) {
    res.status(500).json(fail);
  }
});
router.post("/addSubject", [check("name", "Введите название темы").notEmpty()], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: errors
          .array()
          .map((el) => el.msg)
          .join(". "),
      });
    }
      const newSubject = new Subject({name: req.body.name});
      newSubject.save();
      const subjects = await Subject.find();
      const subjectsNames = subjects.map(subject => subject.name)
      res.status(201).json([...subjectsNames])
  } catch (e) {
      res.status(500).json(fail);
  }
});
router.post("/deleteSubject", async (req, res) => {
    try {
        await Subject.deleteOne({name: req.body.name});
        const subjects = await Subject.find();
        const subjectsNames = subjects.map(subject => subject.name)
        res.status(201).json([...subjectsNames]);
    }
    catch(e) {
        res.status(500).json(fail);
    }
})
module.exports = router;
