const { user_courses, users, courses } = require("../models");

class user_coursesController {
  static async store(req, res) {
    try {
      let { userId, courseId } = req.body;
      const newUserCourse = await user_courses.create({
        userId,
        courseId,
      });
      if (newUserCourse) {
        res.status(201).json({
          message: "User course created successfully",
          data: {
            id: user_courses.id,
            userId: newUserCourse.userId,
            courseId: newUserCourse.courseId,
          },
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
          userId: id,
        },
        include: [
          {
            model: courses,
            as: "course",
            attributes: ["title"],
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
          courseId: id,
        },
        include: [
          {
            model: users,
            as: "user",
            attributes: ["name"],
          },
        ],
      });

      const userCoursesData = userCourses.map((userCourse) => ({
        id: userCourse.id,
        userId: userCourse.userId,
        courseId: userCourse.courseId,
        user: userCourse.user,
      }));

      res.status(200).json({
        message: "Success getting user courses",
        data: userCoursesData,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error getting user courses",
        data: error,
      });
    }
  }
  static async updateByUser(req, res) {
    try {
      const { userId, courseId } = req.params;
      const { courseIdUpdate } = req.body;
      const userCourse = await user_courses.findOne({
        where: {
          userId,
          courseId,
        },
      });
      if (userCourse == null) {
        return res.status(400).json({
          message: "User course not found",
        });
      }
      const updatedUserCourse = await userCourse.update({
        courseId: courseIdUpdate,
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
  static async deleteByUserandCourse(req, res) {
    try {
      const { userId, courseId } = req.params;
      const userCourse = await user_courses.findOne({
        where: {
          userId,
          courseId,
        },
      });
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
