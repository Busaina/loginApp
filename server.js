const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const port = process.env.PORT || 3000;
const { v4: uuidv4 } = require("uuid");

const router = require("./router");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/route", router);

app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
//home route
app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login System",
    subtitle: "Login for the existing user",
  });
});
app.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Signup System",
    subtitle: "signup for the new user",
  });
});

app.listen(port, () => {
  console.log("server 3000");
});
