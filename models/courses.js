"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      courses.belongsTo(models.course_categories, {
        foreignKey: "course_category_id",
        as: "course_category",
      });
      courses.belongsToMany(models.users, { through: "user_courses" });
    }
  }
  courses.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "courses",
    }
  );
  return courses;
};
