const express = require("express");
const Collection = require("../models/Collection");
const User = require("../models/User");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
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
    const userId = req.params.id;
    const collections = await Collection.find({ ownerId: userId });
    res
      .status(201)
      .json([...collections]);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Ошибка сервера" });
  }
});
module.exports = router;
