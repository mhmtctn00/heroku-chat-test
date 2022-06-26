let sender = prompt("İsminizi giriniz .");

const socket = io.connect("http://localhost:3000", {
  query: "sender=" + sender,
});

const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

submitBtn.addEventListener("click", () => {
  socket.emit("chat", {
    sender: sender,
    message: message.value,
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typing", sender);
});

socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.sender + " : </strong>" + data.message + "</p>";
});
socket.on("typing", (data) => {
  feedback.innerHTML = "<p>" + data + " yazıyor... </p>";
});
