const router = require("express").Router();
const mandrillRoutes = require("./mandrill");

// Mandrill routes MATCHES -> "api/mandrill"
router.use("/mandrill", mandrillRoutes);

module.exports = router;
