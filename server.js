const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 3000;
if (app.get("env") !== "production") {
  require("dotenv").config();
}

// imported routers
const indexRouter = require("./routes/index");
const authorsRouter = require("./routes/authors");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(express.json());

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
app.use("/authors", authorsRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
