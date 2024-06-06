/*
var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
    video.srcObject = stream;
    })
    .catch(function (err0r) {
    console.log("Something went wrong!");
    });
}
*/


// var video = document.querySelector("#videoElement");
// var canvas = document.querySelector("#canvas");


// // Función para capturar un frame
// function captureFrame() {
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     var context = canvas.getContext('2d');
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     var dataURL = canvas.toDataURL('image/png');
//     //downloadFrame(dataURL);
//     res = fetch("https://jsonplaceholder.typicode.com/todos", {
//   method: "POST",
//   body: JSON.stringify({
//     userId: 1,
//     title: "Fix my bugs",
//     completed: false
//   }),
//   headers: {
//     "Content-type": "application/json; charset=UTF-8"
//   }
// });
// console.log(res)
// }

// // Función para descargar el frame capturado
// function downloadFrame(dataURL) {
//     var a = document.createElement('a');
//     a.href = dataURL;
//     a.download = 'frame.png';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
// }

// // Función de pulso
// function startPulse() {
//     // Llama a captureFrame cada 1000 milisegundos (1 segundo)
//     setInterval(captureFrame, 3000);
//     console.log("pulso iniciado")
// }

// // Accede al video de la cámara
// if (navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({ video: true })
//         .then(function (stream) {
//             video.srcObject = stream;
//             console.log("acceso a la camara");
//             // Inicia el pulso después de obtener acceso a la cámara
//             startPulse();
//         })
//         .catch(function (err0r) {
//             console.log("Something went wrong!");
//         });


var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");


// Función para capturar un frame
function captureFrame() {
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;
var context = canvas.getContext('2d');
context.drawImage(video, 0, 0, canvas.width, canvas.height);
var dataURL = canvas.toDataURL('image/png');

// Enviar el frame al servidor
fetch("https://8000-idx-saiapi-1717663368732.cluster-pgviq6mvsncnqxx6kr7pbz65v6.cloudworkstations.dev/api/process_frame", { // Replace with your actual API endpoint
method: "POST",
body: JSON.stringify({
    frame: dataURL
}),
headers: {
    "Content-type": "application/json; charset=UTF-8"
}
})
.then(response => response.json())
.then(data => {
console.log('Predictions:', data.predictions);
})
.catch((error) => {
console.error('Error:', error);
});
}

// Función de pulso
function startPulse() {
// Llama a captureFrame cada 3000 milisegundos (3 segundos)
setInterval(captureFrame, 3000);
console.log("Pulse iniciado");
}

// Accede al video de la cámara
if (navigator.mediaDevices.getUserMedia) {
navigator.mediaDevices.getUserMedia({ video: true })
.then(function (stream) {
    video.srcObject = stream;
    console.log("Acceso a la cámara");
    // Inicia el pulso después de obtener acceso a la cámara
    startPulse();
})
.catch(function (error) {
    console.log("Algo salió mal:", error);
});
}
