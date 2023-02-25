const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost.js");
const fileUpload = require("express-fileupload");

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
app.use(fileUpload());
app.set("views", path.join(__dirname, "./public/views"));

app.use(express.json());

//File Upload initialization

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
app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.render("post", { blogpost });
});
app.get("/posts/new", (req, res) => {
  res.render("create");
});

//Post requests
app.post("/posts/store", async (req, res) => {
  //   const files = req.files;
  let image = req.files.image;
  //   console.log(req);
  console.log(req.files);
  //   console.log(req);
  image.mv(path.resolve(___dirname, "./public/img", image.name));
  async (error) => {
    await BlogPost.create({ ...req.body, image: "/img/" + image.name });
    res.redirect("/");
  };
});

// //Post requests
// app.post("/posts/store", async (req, res) => {
//     //   const { title, body } = req.body;
//     //   const obj = JSON.stringify(req.body);
//     console.log(req.body);
//     await BlogPost.create(req.body, (error, blogpost) => {
//       res.redirect("/");
//     });
//   });
