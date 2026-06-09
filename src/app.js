const express = require("express");
const cookieParser = require("cookie-parser")
const app = express()
app.use(cookieParser())
app.use(express.json())

/**
 * - Routes required
 */
const authRouter = require("./routes/auth.route");
const accountRouter = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.route");

/**
 * - Use Routers
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ledger API is running"
  });
});

app.use("/api/auth" , authRouter)    
app.use("/api/accounts",accountRouter)
app.use("/api/transactions", transactionRoutes)

module.exports= app