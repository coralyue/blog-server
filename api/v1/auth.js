const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // 对jwt数据进行加密处理
const { User, Manager } = require("../../models");
const { jwtSecret } = require("../../utils/config");

router.post("/login", async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      userName
    });
    if (user) {
      const isValidated = bcrypt.compareSync(password, user.password); // 验证密码
      if (isValidated) {
        const token = jwt.sign(
          {
            userId: user.id
          },
          jwtSecret,
          {
            expiresIn: "10h"
          }
        );
        res.json({
          code: "success",
          token
        });
      } else {
        res.json({
          code: "error",
          message: "用户密码错误！"
        });
      }
    } else {
      res.json({
        code: "error",
        message: "user not found"
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/manager_login", async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      res.json({
        code: "error",
        message: "参数错误！"
      });
      return;
    }
    const u = await Manager.findOne({ userName });
    if (u) {
      const isPwdValidated = bcrypt.compareSync(password, u.password);
      if (isPwdValidated) {
        res.json({
          code: "success",
          token: jwt.sign(
            {
              userId: u.id
            },
            jwtSecret,
            {
              expiresIn: "10h"
            }
          )
        });
      } else {
        res.json({
          code: "error",
          message: "用户密码错误！"
        });
      }
    } else {
      res.json({
        code: "error",
        message: "用户信息不存在！"
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
