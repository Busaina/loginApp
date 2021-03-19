var express = require("express");
var router = express.Router();

const credentials = {
  email: [
    "admin@gmail.com",
    "busaina@gmail.com",
    "zenab@gmail.com",
    "shabbirmitha786@gmail.com",
  ],
  password: ["admin123", "busaina", "zenab", "shibbu1905"],
  incorrect: false,
};

router.post("/login", (req, res) => {
  if (
    credentials.email.includes(req.body.email) &&
    credentials.password[credentials.email.indexOf(req.body.email)] ==
      req.body.password
  ) {
    req.session.user = req.body.email;
    console.log(req.session.user);
    res.redirect("/route/dashboard");
  } else {
    credentials.incorrect = true;
    res.render("login", { incorrect: credentials.incorrect });
  }
});
router.post("/signup", (req, res) => {
  if (!credentials.email.includes(req.body.email)) {
    credentials.email.concat(req.body.email);
    credentials.password.concat(req.body.password);
    req.session.user = req.body.email;
    res.redirect("/route/dashboard");
  } else {
    credentials.incorrect = true;
    res.render("signup", { incorrect: credentials.incorrect });
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
      res.render("home", {
        title: "Express",
        logout: "logout succesfully...!",
      });
    }
  });
});
module.exports = router;
