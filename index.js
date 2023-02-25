const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost.js");
const app = new express();

mongoose.set("strictQuery", false);
require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "./public/views"));

app.use(express.json());

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(4000, (req, res) => {
//   console.log("App listening on port 4000");
// });

//App Routes
app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index", { blogposts });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/post", (req, res) => {
  res.render("post");
});
app.get("/posts/new", (req, res) => {
  res.render("create");
});

//Post requests
app.post("/posts/store", async (req, res) => {
  //   const { title, body } = req.body;
  //   const obj = JSON.stringify(req.body);
  console.log(req.body);
  await BlogPost.create(req.body, (error, blogpost) => {
    res.redirect("/");
  });
});
