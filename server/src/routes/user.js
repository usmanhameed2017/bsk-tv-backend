const { createUser, fetchAllUser } = require("../controllers/user");
const { pagination } = require("../middlewares/pagination");

// Router instance
const userRouter = require("express").Router();

// Create user
userRouter.route("/")
.get(pagination, fetchAllUser)
.post(createUser)

module.exports = userRouter;