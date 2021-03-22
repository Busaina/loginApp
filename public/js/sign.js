const socket = io();
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  console.log("runningg...");
  e.preventDefault();
  const person = e.target[0].value;
  const msg = e.target[1].value;
  socket.emit("msg", {
    person,
    msg,
  });
});

socket.on("message", (message) => {
  console.log(message);
});
