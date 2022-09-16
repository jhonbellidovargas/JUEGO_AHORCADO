var palabras = [
  "hola",
  "adios",
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
];

var palabra = "";
var letras = [];
var aciertos = 0;
var fallos = 0;
var fin = false;
var intentos = 7;

const resultadoContainer = document.getElementsByClassName(
  "resultado-container"
);
const resultadoPositivo = document.getElementsByClassName(
  "resultado-texto--positivo"
);
const resultadoNegativo = document.getElementsByClassName(
  "resultado-texto--negativo"
);
const respuesta = document.getElementsByClassName("respuesta");
const btn_letras = document.querySelectorAll(".letra-btn");

for (let i = 0; i < btn_letras.length; i++) {
  btn_letras[i].addEventListener("click", letraIngreso);
}

for (let i = 0; i < btn_letras.length; i++) {
  btn_letras[i].disabled = true;
  btn_letras[i].classList.add("letra-btn--disabled");
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
    letras.push("-");
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
  imagen[0].src = "./images/img" + f + ".png";
}

function victoria() {
  fin = true;
  resultadoContainer[0].style.display = "flex";
  resultadoPositivo[0].style.display = "flex";
  resultadoNegativo[0].style.display = "none";
}

function derrota() {
  fin = true;
  resultadoContainer[0].style.display = "flex";
  resultadoNegativo[0].style.display = "flex";
  resultadoPositivo[0].style.display = "none";
}

function letraIngreso(event) {
  console.log(String(event.target.innerHTML).toUpperCase());
  l = String(event.target.innerHTML).toUpperCase();
  // acierto
  console.log("buscare en ", palabra, letras);
  for (var i = 0; i < palabra.length; i++) {
    if (palabra[i] == l && letras[i] == "-") {
      letras[i] = l;
      console.log("acierto");
      aciertos++;
      mostrarPalabra();
      // comprobar si ha ganado
      if (aciertos == palabra.length) {
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
    cambiarImagen(fallos);
    if (fallos == intentos) {
      derrota();
    }
  }
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
}
function jugar() {
  iniciarJuego();
}
