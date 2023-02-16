const { admin } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/auth.config.js");

class adminController {
  static async register(req, res) {
    try {
      let { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json("Please fill all the fields");
      } else {
        const checkDuplicateEmail = await admin.findOne({
          where: { email: email },
        });
        if (checkDuplicateEmail) {
          return res.status(400).json("Email already exists");
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newAdmin = await admin.create({
            name,
            email,
            password: hashedPassword,
          });
          const payload = {
            admin: {
              id: newAdmin.id,
              email: newAdmin.email,
            },
          };
          const token = jwt.sign(payload, keys.secret, {
            expiresIn: 3600,
          });

          return res.status(201).json({
            id: newAdmin.id,
            name: newAdmin.name,
            token: token,
          });
        }
      }
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const foundAdmin = await admin.findOne({ where: { email: email } });
      if (!foundAdmin) {
        return res.status(400).json("User not found");
      } else {
        const isMatch = await bcrypt.compare(password, foundAdmin.password);
        if (!isMatch) {
          return res.status(400).json("Invalid credentials");
        } else {
          const payload = {
            admin: {
              id: foundAdmin.id,
            },
          };
          const token = jwt.sign(payload, keys.secret, {
            expiresIn: 3600,
          });
          return res.status(200).json({
            id: foundAdmin.id,
            name: foundAdmin.name,
            token: token,
          });
        }
      }
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = adminController;
