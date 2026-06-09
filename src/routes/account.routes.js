const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");
const router = express.Router();
const ledgerModel = require("../model/ledger.model")
/**
 * POST /api/account
 * - Create a new account
 * - Protected Route
 */

router.post(
  "/",
  authMiddleware.authMiddleware,
  accountController.createAccountController,
);

/**
 * - Get /api/accounts/
 * - Get all account of the logged-in user
 * - Protected Route
 */
router.get(
  "/",
  authMiddleware.authMiddleware,
  accountController.getAccountsController,
);

/**
 * /api/accounts/balance/:accountId
 */

router.get(
  "/balance/:accountId",
  authMiddleware.authMiddleware,
  accountController.getAccountBalanceController,
);

module.exports = router;
