const express = require("express");
const authControllter = require("../controllers/auth.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router()



/* POST /api/auth/register */
router.post("/register" , authControllter.userRegisterController )




/* POST /api/auth/login */
router.post("/login" , authControllter.userLoginController )

/**
 * logout /api/auth/logout
 */

router.post("/logout", authControllter.userlogOutController)

module.exports = router