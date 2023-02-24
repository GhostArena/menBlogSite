const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public/views"));

app.use(express.static("../public"));

app.listen(5000, () => {
  console.log("App is listening on port 5000");
});

app.get("/", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../public/views/index.html"));
  res.render("index");
});
app.get("/about", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../public/views/about.html"));
  res.render("about");
});
app.get("/contact", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../public/views/contact.html"));
  res.render("contact");
});
app.get("/post", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../public/views/post.html"));
  res.render("post");
});
