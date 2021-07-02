const router = require("express").Router();
const Author = require("../models/author");

// route  GET /authors
// desc   get all authors
// access public
router.get("/", async (req, res) => {
  const searchOptions = {};
  if (req.query.name !== null || req.query.name.trim() !== "")
    searchOptions.name = new RegExp(req.query.name, "i");

  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors, searchOptions: req.query });
  } catch (ex) {
    console.log(ex);
    res.redirect("/");
  }
});

// route  GET /authors/new
// desc   to create new author
// access public
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// route  POST /authors
// desc   post new author
// access public
router.post("/", async (req, res) => {
  try {
    const author = new Author({ name: req.body.name });
    await author.save();

    // res.redirect(`/authors/${author._id}`);
    res.redirect(`/authors`);
  } catch (ex) {
    res.render("authors/new", {
      author: {},
      errorMessage: "Error Creating Author",
    });

    console.log(ex);
  }
});

module.exports = router;
