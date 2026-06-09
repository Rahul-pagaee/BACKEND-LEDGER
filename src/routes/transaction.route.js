const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const transactionController = require("../controllers/transaction.controller");

const transactionRoute = Router();

/**
 * POST /api/transactions/
 * Create a new transaction
 */

transactionRoute.post("/",authMiddleware.authMiddleware, transactionController.createTransaction);



/**
 * - Post /api/transactions/system/initial-funds
 * - Create inital funds transaction from system user
 */
transactionRoute.post("/system/initial-funds", authMiddleware.authSystemMiddleware, transactionController.createInitialFundsTransaction)


module.exports = transactionRoute;
