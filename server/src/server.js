require("dotenv").config();
const connectDB = require("./database/connection");
const { port } = require("./constants");
const app = require("./app");

// Connect database
connectDB()
.then(() => {
    app.on("error", (error) => console.log(`Express app is failed to listen! ${error}`));
    app.listen(port, () => console.log(`Server is listening at port ${port}`));
})
.catch(error => console.log(`Database connection failed! ${error.message}`));