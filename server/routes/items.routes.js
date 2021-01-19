const express = require("express");
const Item = require("../models/Item");
const { check, validationResult } = require("express-validator");
const router = express.Router();
router.get("/item/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).lean();
    res.status(201).json({ ...item });
  } catch (e) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
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
router.post("/removeItem", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.body.itemId);
    const items = await Item.find({ collectionId: req.body.collectionId });
    res.status(201).json([...items]);
  } catch (e) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
module.exports = router;
