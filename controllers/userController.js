const { users } = require("../models");

class userController {
  static async store(req, res) {
    try {
      let { name, email, password } = req.body;
      const user = await users.create({
        name,
        email,
        password,
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  static async showAll(req, res) {
    try {
      const userAll = await users.findAll();
      return res.status(200).json(userAll);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  static async show(req, res) {
    try {
      const { id } = req.params;
      const user = await users.findByPk(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  static async update(req, res) {
    try {
      const { id } = req.params;
      let { name, email, password } = req.body;
      const user = await users.update(
        {
          name,
          email,
          password,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await users.destroy({
        where: { id: id },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = userController;
