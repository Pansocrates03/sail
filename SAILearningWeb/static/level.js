var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");
var detectador = document.querySelector("#detectador");
const semaforos = document.querySelectorAll('.semaforo');
var contador = semaforos.length - 1;
var nextLevelUrl = "{% url 'level' perfil.nivel %}";  // Generar la URL base
nextLevelUrl = nextLevelUrl.replace(perfil.nivel, perfil.nivel + 1); // Reemplazar con el siguiente nivel

// Función para redirigir al siguiente nivel
function goToNextLevel() {
    window.location.href = nextLevelUrl;
}

listaNiveles = [
    ['A', 'A', 'A', 'A', 'A'],
    ['B', 'A', 'B', 'A', 'B'],
    ['C', 'C', 'A', 'B', 'C'],
    ['D', 'D', 'D', 'D', 'D'],
    ['E', 'E', 'E', 'E', 'E'],
    ['F', 'F', 'F', 'F', 'F'],
    ['G', 'G', 'G', 'G', 'G'],
    ['H', 'H', 'H', 'H', 'H'],
    ['I', 'I', 'I', 'I', 'I'],
    ['J', 'J', 'J', 'J', 'J'],
    ['K', 'K', 'K', 'K', 'K'],
    ['L', 'L', 'L', 'L', 'L'],
    ['M', 'M', 'M', 'M', 'M'],
    ['N', 'N', 'N', 'N', 'N'],
    ['O', 'O', 'O', 'O', 'O'],
    ['P', 'P', 'P', 'P', 'P'],
    ['Q', 'Q', 'Q', 'Q', 'Q'],
    ['R', 'R', 'R', 'R', 'R'],
    ['S', 'S', 'S', 'S', 'S'],
    ['T', 'T', 'T', 'T', 'T'],
    ['U', 'U', 'U', 'U', 'U'],
    ['V', 'V', 'V', 'V', 'V'],
    ['W', 'W', 'W', 'W', 'W'],
    ['X', 'X', 'X', 'X', 'X'],
    ['Y', 'Y', 'Y', 'Y', 'Y'],
    ['Z', 'Z', 'Z', 'Z', 'Z',]
]
 
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
    // Llama a captureAndSendFrame cada 500 milisegundos
    setInterval(captureAndSendFrame, 250);
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
        detectador.innerHTML = 'Actualmente detectando: ' + data['letra'];
        if (data['letra'] == 'A' && contador >= 0){
            const semaforo = semaforos[contador]; 
            semaforo.style.backgroundColor = 'green';
            contador--;
        }
        else if (contador === 0) {
            goToNextLevel();
        } 
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
