const router = require("express").Router();
const userController = require("../../controllers/userController");
const validator = require('../../middleware/validation/validators');
const isAuthroizedRoute = require('../../middleware/auth');

// MATCHES -> "/api/users/register"
router.route("/register")
  .post(validator.registrationValidator, userController.register);
// MATCHES -> "/api/users/login"
router.route("/login")
  .post(userController.login);

  // MATCHES -> "/api/users/auth"
router.route('/auth')
  .get(isAuthroizedRoute, userController.getAuthorizedUser);


module.exports = router;