const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("#msg");
const $messageFormButton = $messageForm.querySelector("button");
const name = document.getElementById("username").innerText;
// const $sendLocationButton = document.querySelector('#send-location')

socket.emit("username", name);

socket.on("message", (message) => {
  console.log(message);
});

socket.on("left", (user) => {
  if (user) console.log(user, " has left!");
});

socket.on("notice", (msg) => {
  console.log(msg);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;
  let date = new Date();
  let tm = date.getHours() + ":" + date.getMinutes();
  const str = name + " : " + message + " ( " + tm + " )";

  socket.emit("sendMessage", str, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }

    // console.log("Message delivered!");
  });
  socket.emit("dis", name);
});

// $sendLocationButton.addEventListener('click', () => {
//     if (!navigator.geolocation) {
//         return alert('Geolocation is not supported by your browser.')
//     }

//     $sendLocationButton.setAttribute('disabled', 'disabled')

//     navigator.geolocation.getCurrentPosition((position) => {
//         socket.emit('sendLocation', {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//         }, () => {
//             $sendLocationButton.removeAttribute('disabled')
//             console.log('Location shared!')
//         })
//     })
// })
