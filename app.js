const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app

const app = express();

// connect to mongo db

const dbURI =
  "mongodb+srv://leosbilal:pWDAxihNXokV4fbN@nodetuts.kmxhjkd.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register vie engine

app.set("view engine", "ejs");

// mongoose and mogo sandbox routes

// ======================================= send to mongo db

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog 2",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });
//   blog.save().then((result) => {
//     res.send(result).catch((err) => console.log(err));
//   });
// });

// ======================================  get from mongo db
// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// =====================================   single blog
// app.get("/single-blog", (req, res) => {
//   Blog.findById("650c416ed1945a34fd5624bd").then((result) => {
//     res.send(result).catch((err) => {
//       console.log(err);
//     });
//   });
// });

// middleware and static files

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  // const blogs = [
  //   {
  //     title: "yoshi finds eggs",
  //     snippet: "lorem ipsum sedts sit amet consectetur",
  //   },
  //   {
  //     title: "Mario finds the stars",
  //     snippet: "lorem ipsum sedts sit amet consectetur",
  //   },
  //   {
  //     title: "Ninja finds swords",
  //     snippet: "lorem ipsum sedts sit amet consectetur",
  //   },
  //   {
  //     title: "How to defeat browser",
  //     snippet: "lorem ipsum sedts sit amet consectetur",
  //   },
  // ];
  // res.render("index", { title: "Home Page", blogs });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

// blog routes
app.use(blogRoutes);

// 404 pages

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});
