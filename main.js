var palabras = [
  "casa",
  "perro",
  "gato",
  "cocina",
  "mesa",
  "silla",
  "ordenador",
  "teclado",
  "raton",
  "monitor",
  "telefono",
  "movil",
  "agua",
  "sol",
  "luna",
  "estrella",
  "planeta",
  "galaxia",
  "tierra",
  "cielo",
  "nube",
  "lluvia",
  "cama",
  "sillon",
  "sofa",
  "escoba",
  "pared",
  "techo",
  "puerta",
  "ventana",
  "oso",
  "leon",
  "tigre",
  "jirafa",
  "elefante",
  "ballena",
  "delfin",
  "tiburon",
  "pulpo",
  "pato",
  "gallina",
  "vaca",
  "caballo",
  "perico",
  "pajaro",
  "abeja",
  "mosca",
  "mariposa",
  "libro",
  "cuaderno",
  "lapiz",
  "borrador",
];

var palabra = "";
var letras = [];
var aciertos = 0;
var fallos = 0;
var fin = false;
var intentos = 7;
var pistas = 0;

const resultadoContainer = document.getElementsByClassName(
  "resultado-container"
);
const resultadoPositivo = document.getElementsByClassName(
  "resultado-texto--positivo"
);
const resultadoNegativo = document.getElementsByClassName(
  "resultado-texto--negativo"
);
const audioIcon = document.getElementsByClassName("audio-icon");
const respuesta = document.getElementsByClassName("respuesta");
const btn_letras = document.querySelectorAll(".letra-btn");

var fondoAudio = new Audio("./audio/fondo.wav");
var derrotaAudio = new Audio("./audio/derrota.wav");
var victoriaAudio = new Audio("./audio/victoria.wav");
var falloAudio = new Audio("./audio/fallo.wav");
var correctoAudio = new Audio("./audio/correcto.wav");
var clickAudio = new Audio("./audio/click.wav");

// precargamos los audios para que no haya retraso
function precargarAudios() {
  derrotaAudio.load();
  victoriaAudio.load();
  falloAudio.load();
  correctoAudio.load();
  clickAudio.load();
}

function init() {
  precargarAudios();
}

for (let i = 0; i < btn_letras.length; i++) {
  btn_letras[i].addEventListener("click", letraIngreso);
}

for (let i = 0; i < btn_letras.length; i++) {
  btn_letras[i].disabled = true;
  btn_letras[i].classList.add("letra-btn--disabled");
}
function onAudioClick() {
  if (fondoAudio.paused) {
    playAudio(fondoAudio, true, 0.05);
    audioIcon[0].src = "./imagenes/audio-play.png";
  } else {
    stopAudio(fondoAudio);
    audioIcon[0].src = "./imagenes/audio-mute.png";
  }
}
function escongerPalabra() {
  letras = [];
  // escogemos la palabra aleatoria y la volvemos mayusculas
  var adivinar =
    palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();

  palabra = adivinar;
  respuesta[0].innerHTML = palabra;
  // escondemos la palabra
  for (var letra in palabra) {
    if (palabra.length <= 4) {
      letras.push("-");
    } else if (palabra.length > 4 && palabra.length <= 6) {
      if (letra == 0) {
        letras.push(palabra[letra]);
      } else {
        letras.push("-");
      }
    } else {
      if (letra == 0 || letra == palabra.length - 1) {
        letras.push(palabra[letra]);
      } else {
        letras.push("-");
      }
    }
  }
  return adivinar;
}

function mostrarPalabra() {
  // mostrar la palabra en un span
  var palabraAdivinar = document.getElementsByClassName("palabra-adivinar");
  //palabraAdivinar borrar el contenido
  palabraAdivinar[0].innerHTML = "";
  for (var letra in letras) {
    var span = document.createElement("span");
    span.innerHTML = letras[letra];
    palabraAdivinar[0].appendChild(span);
  }
  // actualizar marcador
  const aciertos = document.getElementsByClassName("aciertos");
  aciertos[0].innerHTML = "0" + this.aciertos;
  const fallos = document.getElementsByClassName("fallos");
  fallos[0].innerHTML = "0" + this.fallos;
}

function cambiarImagen(f) {
  var imagen = document.getElementsByClassName("imagen");
  imagen[0].src = "./imagenes/img" + f + ".png";
}

function victoria() {
  fin = true;
  resultadoContainer[0].style.display = "flex";
  resultadoPositivo[0].style.display = "flex";
  resultadoNegativo[0].style.display = "none";
  playAudio(victoriaAudio, false, 0.7);
}

function derrota() {
  fin = true;
  resultadoContainer[0].style.display = "flex";
  resultadoNegativo[0].style.display = "flex";
  resultadoPositivo[0].style.display = "none";
  playAudio(derrotaAudio, false, 0.7);
}

function letraIngreso(event) {
  console.log(String(event.target.innerHTML).toUpperCase());
  l = String(event.target.innerHTML).toUpperCase();
  // acierto
  //console.log("buscare en ", palabra, letras);
  for (var i = 0; i < palabra.length; i++) {
    if (palabra[i] == l && letras[i] == "-") {
      letras[i] = l;
      playAudio(correctoAudio, false, 0.9);
      aciertos++;
      mostrarPalabra();
      // comprobar si ha ganado
      if (palabra == letras.join("")) {
        victoria();
        break;
      }
      break;
    }
  }
  // fallo
  if (palabra.indexOf(l) == -1) {
    fallos++;
    mostrarPalabra();
    playAudio(falloAudio, false, 0.4);
    cambiarImagen(fallos);
    if (fallos == intentos) {
      derrota();
    }
  }
}

function playAudio(audio, repetir, volumen = 0.2) {
  audio.loop = repetir;
  audio.volume = volumen;
  audio.play();
}

function stopAudio(audio) {
  audio.pause();
}

function iniciarJuego() {
  aciertos = 0;
  fallos = 0;
  resultadoContainer[0].style.display = "none";
  cambiarImagen(0);
  var palabra = escongerPalabra();
  console.log(palabra);
  mostrarPalabra(palabra);
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = false;
    btn_letras[i].classList.remove("letra-btn--disabled");
  }
  playAudio(clickAudio, false, 0.4);
}
function jugar() {
  iniciarJuego();
}
