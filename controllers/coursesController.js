const { courses } = require("../models");

class coursesController {
  static async store(req, res) {
    try {
      let { name, description, course_category_id } = req.body;
      const newCourse = await courses.create({
        name: name,
        description: description,
        course_category_id: course_category_id,
      });
      if (newCourse) {
        res.status(201).json({
          message: "Course created successfully",
          data: newCourse,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Error creating course",
        data: error,
      });
    }
  }
  static async showAll(req, res) {
    try {
      const courses = await courses.findAll();
      res.status(200).json({
        message: "Success getting all courses",
        data: courses,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error getting all courses",
        data: error,
      });
    }
  }
  static async showOne(req, res) {
    try {
      const { id } = req.params;
      const course = await courses.findByPk(id);
      res.status(200).json({
        message: "Success getting course",
        data: course,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error getting course",
        data: error,
      });
    }
  }
  static async update(req, res) {
    try {
      const { id } = req.params;
      let { name, description, course_category_id } = req.body;
      const course = await courses.findByPk(id);
      const updatedCourse = await course.update({
        name: name,
        description: description,
        course_category_id: course_category_id,
      });
      res.status(200).json({
        message: "Success updating course",
        data: updatedCourse,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error updating course",
        data: error,
      });
    }
  }
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const course = await courses.findByPk(id);
      const deletedCourse = await course.destroy();
      res.status(200).json({
        message: "Success deleting course",
        data: deletedCourse,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error deleting course",
        data: error,
      });
    }
  }
}

module.exports = coursesController;
