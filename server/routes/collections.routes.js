const express = require("express");
const Collection = require("../models/Collection");
const User = require("../models/User");
const Item = require("../models/Item");
const Subjects = require("../models/Subjects");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const collections = await Collection.find({ ownerId: userId });
    const user = await User.findById(userId);
    res
      .status(201)
      .json({ collections: [...collections], ownerName: user.name });
  } catch (e) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
router.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subjects.find({}).lean();
    res.status(201).json({ subjects: [...subjects[0].subjects] });
  } catch (e) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
router.get("/collection/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id).lean();
    const items = await Item.find({ collectionId: req.params.id }).lean();
    res.status(201).json({ collection: { ...collection }, items: items });
  } catch (e) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
router.get("/item/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).lean();
    res.status(201).json({...item});
  } catch(e) {
    res.status(500).json({message: "Ошибка сервера"});
  }
})
router.post(
  "/addNewCollection",
  [
    check("title", "Введите название коллекции").notEmpty(),
    check("description", "Введите описание").notEmpty(),
    check("subject", "Выберите тему").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors
            .array()
            .map((el) => el.msg)
            .join(". "),
        });
      }
      req.body.optionalFields.forEach((item) => {
        if (item.name === "")
          return res.status(400).json({
            message: "У всех дополнительных полей должно быть имя",
          });
      });
      const twin = await Collection.findOne({ title: req.body.title });
      if (twin) {
        return res
          .status(400)
          .json({ message: "Коллекция с таким названием есть" });
      }
      const collection = new Collection({ ...req.body });
      collection.save();
      res.status(201).json({ message: "Успешно" });
    } catch (e) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);
router.post(
  "/addNewItem",
  [
    check("title", "Введите название элемента").notEmpty(),
    check("tags", "Элементы должны иметь как минимум один тег").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors
          .array()
          .map((el) => el.msg)
          .join(". "),
      });
    }
    try {
      const item = new Item({ ...req.body });
      item.save();
      return res.status(201).json({ message: "Успешно" });
    } catch (e) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);
module.exports = router;
/*  const array = [
      {"bool": true},
      {"text": "text"},
      {"date": "2020-12-12"},
      {"num": 12},
    ];

      const collection = new Collection({
      title: "Test2",
      description: "TestDescription2",
      subject: "TestSubject2",
      ownerId: userId,
      ownerName: "Alex",
      optionalFields: array,
    });
     collection.save();
    */
