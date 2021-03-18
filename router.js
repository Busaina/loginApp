var express = require("express");
var router = express.Router();

const credentials = {
  email: "admin@gmail.com",
  password: "admin123",
};

router.post("/login", (req, res) => {
  if (
    req.body.email == credentials.email &&
    req.body.password == credentials.password
  ) {
    req.session.user = req.body.email;
    res.redirect("/route/dashboard");
  } else {
    res.send("Invalid email or password");
  }
});

router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { user: req.session.user });
  } else {
    res.send("unauthorised User");
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.render("base", {
        title: "Express",
        logout: "logout succesfully...!",
      });
    }
  });
});
module.exports = router;
