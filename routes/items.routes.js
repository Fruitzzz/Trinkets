const express = require("express");
const Item = require("../models/Item");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/verify.middleware");
const success = { msg: "succes" };
const fail = { msg: "serverFail" };
router.get("/item/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).lean();
    res.status(201).json({ ...item });
  } catch (e) {
    res.status(500).json(fail);
  }
});
router.get("/lastItems", async (req, res) => {
  try {
    const items = await Item.find({}).sort({ creationDate: "desc" }).limit(5);
    res.status(201).json([...items]);
  } catch (e) {
    res.status(500).json(fail);
  }
});
router.get("/tags", async (req, res) => {
  try {
    const items = await Item.find();
    items.sort(() => Math.random() - 0.5);
    const tags = [];
    items.forEach((item) => {
      tags.push(...item.tags);
    });
    res.status(201).json(tags.slice(0, 15));
  } catch (e) {
    res.status(500).json(fail);
  }
});
router.get("/search/:searchText", async (req, res) => {
  try{
  const result = await Item.fuzzySearch(req.params.searchText);
  res.status(201).json(result);
  }
  catch(e) {
    res.status(500).json(fail);
  }
})
router.post(
  "/addNewItem",
  auth,
  [
    check("title",  "enterItemName").notEmpty(),
    check("tags", "itemTags").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: errors
          .array()[0].msg
      });
    }
    try {
      const item = new Item({ ...req.body });
      await item.save();
      const items = await Item.find({ collectionId: req.body.collectionId });
      return res.status(201).json([...items]);
    } catch (e) {
      res.status(500).json(fail);
    }
  }
);
router.post("/removeItem", auth, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.body.itemId);
    if (req.body.collectionId) {
      const items = await Item.find({ collectionId: req.body.collectionId });
      res.status(201).json([...items]);
    } else res.status(201).json(success);
  } catch (e) {
    res.status(500).json(fail);
  }
});
router.post("/updateItem", auth, async (req, res) => {
  try {
    const { id, title, tags } = req.body;
    await Item.findByIdAndUpdate(id, { title, tags });
    const item = await Item.findById(id).lean();
    res.status(201).json({ ...item });
  } catch (e) {
    res.status(500).json(fail);
  }
});
module.exports = router;
