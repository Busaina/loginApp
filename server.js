const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const port = process.env.PORT || 3000;
const { v4: uuidv4 } = require("uuid");
const router = require("./router");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

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

const server = http.createServer(app);
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, "public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.emit("message", "Welcome!");
  socket.broadcast.emit("message", "..");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("..");
    }

    io.emit("message", message);
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "message",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", "..");
  });
});

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

server.listen(port, () => {
  console.log(`server ${port}`);
});
