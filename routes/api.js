var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.post("/users", userController.store);
router.get("/users", userController.showAll);
router.get("/user/:id", userController.show);
router.put("/user/:id", userController.update);

module.exports = router;
