const router = require("express").Router();
const userController = require("../../controllers/userController");
const validator = require('../../middleware/validation/validators');
const isAuthroizedRoute = require('../../middleware/auth');

// MATCHES -> "/api/users/register"
router.route("/register")
  .post(validator.registrationValidator, userController.register);
// MATCHES -> "/api/users/login"
router.route("/login")
  .post(validator.loginValidator, userController.login);
// MATCHES -> "/api/users/logout"
router.route("/logout")
  .post(isAuthroizedRoute, userController.logOut);
// MATCHES -> "/api/users/auth"
router.route('/auth')
  .get(isAuthroizedRoute, userController.getAuthorizedUser);
// MATCHES -> "/api/users/sendpassemail"
router.route('/sendpassemail')
  .post(userController.sendPassEmail);
// MATCHES -> "/api/users/resetpass"
router.route('/resetpass')
  .post(userController.resetPass);


module.exports = router;