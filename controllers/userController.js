const { users } = require("../models");

class userController {
  static async store(req, res) {
    try {
      let { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json("Please fill all the fields");
      } else {
        const checkDuplicateEmail = await users.findOne({
          where: { email: email },
        });
        if (checkDuplicateEmail) {
          return res.status(400).json("Email already exists");
        } else {
          const user = await users.create({
            name,
            email,
            password,
          });
          return res.status(201).json(user);
        }
      }
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  static async showAll(req, res) {
    try {
      const userAll = await users.findAll();
      //show without password
      return res.status(200).json(
        userAll.map((user) => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        })
      );
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  static async show(req, res) {
    try {
      const { id } = req.params;
      const user = await users.findByPk(id);
      return res.status(200).json({
        message: "User found successfully",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
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
      return res.status(200).json({
        message: "User updated successfully",
        data: {
          name,
          email,
          password,
        },
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await users.destroy({
        where: { id: id },
      });
      return res.status(200).json({
        message: "User deleted successfully",
        data: {
          id,
        },
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = userController;
