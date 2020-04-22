const router = require("express").Router();
const mandrillRoutes = require("./mandrill");
const roomRoutes = require('./roomRoutes');

// Mandrill routes MATCHES -> "api/mandrill"
router.use("/mandrill", mandrillRoutes);

// Room routes MATCHES -> "/api/rooms"
router.use("/rooms",roomRoutes);

module.exports = router;
