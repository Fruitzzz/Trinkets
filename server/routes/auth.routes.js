const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");
const router = express.Router();

router.post(
  "/signUp",
  [
    check("name", "Введите имя").notEmpty(),
    check("email", "Некорректный email").normalizeEmail().isEmail(),
    check("password", "Минимальная длина пароля 5 символов").isLength({
      min: 5,
    }),
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
      const { name, email, password } = req.body;
      const candidate = await User.findOne({ $or: [{ email }, { name }] });
      if (candidate) {
        if (candidate.email === email) {
          return res
            .status(400)
            .json({ message: "Этот email уже зарегистрирован" });
        } else {
          return res.status(400).json({
            message: "Пользователь с таким именем уже зарегистрирован",
          });
        }
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "Регистрация прошла успешно" });
    } catch (e) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);
router.post("/signIn", [check("name").notEmpty()], async (req, res) => {
  try {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({
        message: "Введите имя",
      });
    }
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Неверный пароль" });
    }
    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"));
    res.json({ token, userId: user.id, userName: user.name });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
module.exports = router;
