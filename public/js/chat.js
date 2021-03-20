const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("#msg");
const $messageFormButton = $messageForm.querySelector("button");
// const $sendLocationButton = document.querySelector('#send-location')

socket.on("message", (message) => {
  console.log(message);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;
  const name = e.target.elements.name.value;
  const str = name + " : " + message;

  socket.emit("sendMessage", str, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }

    // console.log("Message delivered!");
  });
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
