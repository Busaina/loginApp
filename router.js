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
};

router.post("/login", (req, res) => {
  if (
    credentials.email.includes(req.body.email) &&
    credentials.password[credentials.email.indexOf(req.body.email)] ==
      req.body.password
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
