const { course_categories } = require("../models");

class course_categoriesController {
  static async store(req, res) {
    try {
      let { name } = req.body;
      const newCourseCategory = await course_categories.create({
        name: name,
      });
      if (newCourseCategory) {
        res.status(201).json({
          message: "Course category created successfully",
          data: newCourseCategory,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Error creating course category",
        data: error,
      });
    }
  }
  static async showAll(req, res) {
    try {
      const courseCategories = await course_categories.findAll();
      res.status(200).json({
        message: "Success getting all course categories",
        data: courseCategories,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error getting all course categories",
        data: error,
      });
    }
  }
  static async showOne(req, res) {
    try {
      const { id } = req.params;
      const courseCategory = await course_categories.findByPk(id);
      res.status(200).json({
        message: "Success getting course category",
        data: courseCategory,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error getting course category",
        data: error,
      });
    }
  }
  static async update(req, res) {
    try {
      const { id } = req.params;
      let { name } = req.body;
      const courseCategory = await course_categories.findByPk(id);
      const updatedCourseCategory = await courseCategory.update({
        name: name,
      });
      res.status(200).json({
        message: "Success updating course category",
        data: updatedCourseCategory,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error updating course category",
        data: error,
      });
    }
  }
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const courseCategory = await course_categories.findByPk(id);
      const deletedCourseCategory = await courseCategory.destroy();
      res.status(200).json({
        message: "Success deleting course category",
        data: deletedCourseCategory,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error deleting course category",
        data: error,
      });
    }
  }
}

module.exports = course_categoriesController;
