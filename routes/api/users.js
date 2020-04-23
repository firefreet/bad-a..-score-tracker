const router = require("express").Router();
const userController = require("../../controllers/userController");
const validator = require('../../middleware/validation/validators');
const isAuthenticated = require('../../middleware/auth');

// MATCHES -> "/api/users/register"
router.route("/register")
  .post(validator.registrationValidator, userController.register);
// MATCHES -> "/api/users/login"
router.route("/login")
  .post(userController.login);

  // MATCHES -> "/api/users/auth"
router.route('/auth')
  .get(userController.isAuthenticated);

module.exports = router;