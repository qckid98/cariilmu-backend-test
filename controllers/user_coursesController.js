const { user_courses, users, courses } = require("../models");

class user_coursesController {
  static async store(req, res) {
    try {
      let { user_id, course_id } = req.body;
      const newUserCourse = await user_courses.create({
        user_id: user_id,
        course_id: course_id,
      });
      if (newUserCourse) {
        res.status(201).json({
          message: "User course created successfully",
          data: newUserCourse,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Error creating user course",
        data: error,
      });
    }
  }
  static async showByUser(req, res) {
    try {
      const { id } = req.params;
      const userCourses = await user_courses.findAll({
        where: {
          user_id: id,
        },
        include: [
          {
            model: courses,
            as: "course",
            attributes: ["name", "description"],
          },
        ],
      });
      res.status(200).json({
        message: "Success getting user courses",
        data: userCourses,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error getting user courses",
        data: error,
      });
    }
  }
  static async showByCourse(req, res) {
    try {
      const { id } = req.params;
      const userCourses = await user_courses.findAll({
        where: {
          course_id: id,
        },
        include: [
          {
            model: users,
            as: "user",
            attributes: ["name", "email"],
          },
        ],
      });
      res.status(200).json({
        message: "Success getting user courses",
        data: userCourses,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error getting user courses",
        data: error,
      });
    }
  }
  static async update(req, res) {
    try {
      const { id } = req.params;
      let { user_id, course_id } = req.body;
      const userCourse = await user_courses.findByPk(id);
      const updatedUserCourse = await userCourse.update({
        user_id: user_id,
        course_id: course_id,
      });
      res.status(200).json({
        message: "Success updating user course",
        data: updatedUserCourse,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error updating user course",
        data: error,
      });
    }
  }
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const userCourse = await user_courses.findByPk(id);
      const deletedUserCourse = await userCourse.destroy();
      res.status(200).json({
        message: "Success deleting user course",
        data: deletedUserCourse,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error deleting user course",
        data: error,
      });
    }
  }
}

module.exports = user_coursesController;
