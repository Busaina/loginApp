var express = require("express");
var router = express.Router();

const credentials = {
  email: ["a@gmail.com"],
  password: ["a"],
  incorrect: false,
  username: ["a"],
};

router.post("/login", (req, res) => {
  if (req.body.email == "" || req.body.password == "") {
    credentials.incorrect = true;
    return res.render("login", {
      incorrect: credentials.incorrect,
      message: "please fill all the required inputs",
    });
  }
  if (
    credentials.email.includes(req.body.email) &&
    credentials.password[credentials.email.indexOf(req.body.email)] ==
      req.body.password
  ) {
    req.session.user = req.body.email;
    const index = credentials.email.indexOf(req.body.email);
    req.session.username = credentials.username[index];
    console.log(credentials.email);
    res.redirect("/route/dashboard");
  } else {
    credentials.incorrect = true;
    res.render("login", {
      incorrect: credentials.incorrect,
      message: "Incorrect Email or password",
    });
  }
});
router.post("/signup", (req, res) => {
  if (req.body.email == "" || req.body.password == "") {
    credentials.incorrect = true;
    return res.render("signup", {
      incorrect: credentials.incorrect,
      message: "please fill all the required inputs",
    });
  }
  if (!credentials.email.includes(req.body.email)) {
    credentials.email.push(req.body.email);
    credentials.password.push(req.body.password);
    credentials.username.push(req.body.username);
    req.session.user = req.body.email;
    req.session.username = req.body.username;
    console.log(credentials.email);
    console.log(credentials.username);
    res.redirect("/route/dashboard");
  } else {
    credentials.incorrect = true;
    res.render("signup", {
      incorrect: credentials.incorrect,
      message: "Email already taken",
    });
  }
});

router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("example", {
      user: req.session.user,
      username: req.session.username,
    });
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
