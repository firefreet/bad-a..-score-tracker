const router = require("express").Router();
const mandrillRoutes = require("./mandrill");
const roomRoutes = require('./roomRoutes');
const userRoutes = require('./users');

// Mandrill routes MATCHES -> "api/mandrill"
router.use("/mandrill", mandrillRoutes);

// Room routes MATCHES -> "/api/rooms"
router.use("/rooms",roomRoutes);
// User Routes MATCHES -> 'api/users'
router.use('/users', userRoutes);

module.exports = router;
