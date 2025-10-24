const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { corsOptions } = require("./config");
const { cookieParserSecret } = require("./constants");
const errorHandler = require("./middlewares/errorHandler");
const compression = require("compression");

// Initialize Express App
const app = express();

// ************* MIDDLEWARES ************* //
app.use(cors(corsOptions));
app.use(cookieParser(cookieParserSecret));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(express.json({ limit: "100kb" }));
app.use("/public", express.static(path.resolve("public")));
app.use(compression());

// ************* ROUTES ************* //
// const authRouter = require("./routes/auth");
// const userRouter = require("./routes/user");


// Registered routes
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/user", userRouter);

// Error handling middleware
app.use(errorHandler);

module.exports = app;