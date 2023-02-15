"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class course_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      course_categories.hasMany(models.courses, {
        foreignKey: "course_category_id",
        as: "courses",
      });
    }
  }
  course_categories.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "course_categories",
    }
  );
  return course_categories;
};
