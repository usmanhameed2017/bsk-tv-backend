const { createUser } = require("../controllers/user");

// Router instance
const userRouter = require("express").Router();

// Create user
userRouter.route("/").post(createUser);

module.exports = userRouter;