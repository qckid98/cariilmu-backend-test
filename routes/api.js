var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var course_categoriesController = require("../controllers/course_categoriesController");
var coursesController = require("../controllers/coursesController");
var user_coursesController = require("../controllers/user_coursesController");

// API Routes for users
router.post("/users", userController.store);
router.get("/users", userController.showAll);
router.get("/user/:id", userController.show);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

// API Routes for course_categories
router.post("/course_categories", course_categoriesController.store);
router.get("/course_categories", course_categoriesController.showAll);
router.get("/course_category/:id", course_categoriesController.showOne);
router.put("/course_category/:id", course_categoriesController.update);
router.delete("/course_category/:id", course_categoriesController.delete);

// API Routes for courses
router.post("/courses", coursesController.store);
router.get("/courses", coursesController.showAll);
router.get("/course/:id", coursesController.showOne);
router.put("/course/:id", coursesController.update);
router.delete("/course/:id", coursesController.delete);

// API Routes for user_courses
router.post("/user_courses", user_coursesController.store);
router.get("/user/:id/courses", user_coursesController.showByUser);
router.get("/course/:id/users", user_coursesController.showByCourse);
router.put("/user_course/:id", user_coursesController.update);
router.delete("/user_course/:id", user_coursesController.delete);

module.exports = router;
