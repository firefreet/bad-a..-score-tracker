const router = require("express").Router();
const mandrillController = require("../../controllers/mandrillController");
const validator = require('../../middleware/validation/validators');

// MATCHES -> "/api/mandrill/contact"
router.route("/contact")
  .post(validator.contactValidator, mandrillController.send);

module.exports = router;