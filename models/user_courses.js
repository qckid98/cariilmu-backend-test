"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_courses.belongsTo(models.users, {
        foreignKey: "user_id",
        as: "user",
      });
      user_courses.belongsTo(models.courses, {
        foreignKey: "course_id",
        as: "course",
      });
    }
  }
  user_courses.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_courses",
    }
  );
  return user_courses;
};
