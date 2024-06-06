var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            // Inicia el pulso después de obtener acceso a la cámara
            startPulse();
        })
        .catch(function (err0r) {
            console.log("Something went wrong!");
        });
}

function startPulse() {
    // Llama a captureAndSendFrame cada 3000 milisegundos (3 segundos)
    setInterval(captureAndSendFrame, 3000);
}

function captureAndSendFrame() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(function(blob) {
        sendFrame(blob);
    }, 'image/png');
}

function sendFrame(blob) {
    var formData = new FormData();
    formData.append('file', blob, 'frame.png');

    fetch('http://127.0.0.1:8080/api/upload/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
