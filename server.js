const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
require("dotenv").config();
const app = express();

// imported routers
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// connecting to database
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));

// routers as middleware
app.use("/", indexRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
