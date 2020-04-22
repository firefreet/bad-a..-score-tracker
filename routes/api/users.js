const router = require("express").Router();
const userController = require("../../controllers/userController");
const validator = require('../../middleware/validation/validators');

// MATCHES -> "/api/users/register"
router.route("/register")
  .post(validator.registrationValidator, userController.register);

module.exports = router;