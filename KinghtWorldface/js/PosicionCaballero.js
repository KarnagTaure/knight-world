let x = 5; //Columna
let y = 3; // Fila

//Definir una cola para las funciones de reproducción de Texto y gif

const animacionEstadisticaQueue = []; // Array para almacenar el texto de Estadisticas
const animacionHogueraQueue = []; // Array para almacenar el texto de Hoguera
const animacionCombateQueue = []; // Array para almacenar el texto de Combate
const animacionEventoQueue = []; // Array para almacenar el texto de Eventos
const subidaQueue = []; // Array para almacenar el texto de Subida de Nivel
const gifQueue = []; // Array para almacenar los gif de la zona de Datos
const functionArray = []; // Array para almacenar las funciones en la cola

//Definir una cola para las funciones de reproducción de GIFs
const gifCaballeroContainer = document.getElementById("caballeroEvento");
const caballeroLuchaPath = "images/Gif/Caballero/caballeroLuchando1.gif";
const caballeroMuertePath = "images/Gif/Caballero/caballeroMuerto.gif";
var gifActivoContainer = document.getElementById("caballeroQuieto");

//Inicializar el índice para el container actual
var currentIndex = 0;
var currentIndexDatos = 0;

//Establecer las estadísticas del jugador
var nivel = 1;
var jugadorSaludMax = 50;
var jugadorSaludActual = jugadorSaludMax;
var jugadorAtaque = 15;
var jugadorDefensa = 10;
var expJugadorTotal = 0;
var expJugadorUsada = 0;
var expJugador = 0;
var EXPNvL = 100;
var perro = false;

//Subida de nivel
var subidaFuerza = 5;
var subidaDefensa = 2;
var subidaVida = 10;

//Variables pasos
var pasosDiarios = 0;
var pasosUsados = 0;
var pasosRestantes = 0;
var pasosTotales = 0;
var pasosAyer = 0;

//Seleccionar un enemigo aleatorio para el combate
var enemigo;

//Variables Eventos
const velocidadEscritura = 100; // Ajusta la velocidad de escritura en milisegundos
var tiempoEspera = 30000;
var tiempoCallback = 10000;
var restanteEvento = 0;
var usadoEvento = 0;
var combates = 0;
var gana = 0;
var pierde = 0;
var pociones = 0;

var fechaActual = obtenerFechaActual();
var ubicacionActual;
var ubicacionAnterior;
var gifImages = [];
var casillasVisitadas = [];
const maxCasillasVisitadas = 2;
const maxRastroLength = 10;

function mostrarGif() {
  // Imagen de Archivo
  const caballeroPath = "images/caballero.gif";

  // Crea una contenedor IMG en HTML
  const caballeroImage = document.createElement("img");
  caballeroImage.src = caballeroPath;
  caballeroImage.className = "gifOverlay caballeroSize";

  // Establece la ubicacion de IMG dentro del contenedor
  ubicacionActual =
    document.getElementById("mapContainer").children[(y - 1) * 10 + (x - 1)];
  ubicacionAnterior = ubicacionActual;

  // Coloca la imagen
  ubicacionActual.appendChild(caballeroImage);

  gifImages.push(caballeroImage);
}

function movAleatorio() {
  //actualiza los datos de pasos
  pasosTotales += stepActual;
  // Comprueva que no haya descuadre negativo con los pasos
  if (pasosTotales < pasosAyer) {
    pasosAyer = pasosTotales;
  } else {
    ubicacionAnterior = ubicacionActual;
    pasosDiarios = 4000;//pasosTotales - pasosAyer;
    pasosRestantes = pasosDiarios - pasosUsados;
  }

  if (pasosRestantes >= 1500) {
    pasosRestantes -= 1500;
    pasosUsados += 1500;

    const numAleatorio = Math.floor(Math.random() * 4) + 1;

    let nuevaX = x;
    let nuevaY = y;

    // Lógica para determinar la nueva posición (nuevaX, nuevaY) basada en numAleatorio

    switch (numAleatorio) {
      case 1: // Arriba
        if (y > 0) {
          nuevaY = y - 1;
        }
        break;

      case 2: // Abajo
        if (y < 6) {
          nuevaY = y + 1;
        }
        break;

      case 3: // Izquierda
        if (x > 0) {
          nuevaX = x - 1;
        }
        break;

      case 4: // Derecha
        if (x < 10) {
          nuevaX = x + 1;
          break;
        } /*else{
                nuevaX= x-1;
                break;
            }*/
        break;
    }

    //Coloca la nueva ubicacion en el mapa
    const nuevaUbicacion =
      document.getElementById("mapContainer").children[
        (nuevaY - 1) * 10 + (nuevaX - 1)
      ];

    if (
      (nuevaUbicacion && !casillasVisitadas.includes(nuevaUbicacion)) ||
      casillasVisitadas.length === maxRastroLength
    ) {
      console.log("Coloca Nueva Ubicacion en el Mapa");
      console.log("------------------------------");
      casillasVisitadas.push(ubicacionAnterior);
      ubicacionAnterior.removeChild(ubicacionAnterior.firstChild);
      ubicacionActual = nuevaUbicacion;
      y = nuevaY;
      x = nuevaX;

      console.log("Ubicacion nueva " + y + " , " + x);
      console.log("------------------------------");

      //actualiza el paisaje
      paisajeFondo();

      if (ubicacionActual.firstChild) {
        ubicacionActual.removeChild(ubicacionActual.firstChild);
      }

      //Crea el rastro en el mapa
      const rastroImage = document.createElement("img"); //Crea contenedor IMG
      rastroImage.src = "images/rastro.gif"; // Imagen de archivo
      rastroImage.className = "rastroSize"; // Le pone una clase al Contenedor IMG
      ubicacionAnterior.appendChild(rastroImage); // Agregar rastro en ubicación anterior

      console.log("Coloca rastro");
      console.log("------------------------------");

      ubicacionActual.appendChild(gifImages[gifImages.length - 1]);

      // Verificar las casillas visitadas y eliminar el exceso si supera maxCasillasVisitadas
      if (casillasVisitadas.length > maxCasillasVisitadas) {
        casillasVisitadas.shift();
      }
    } else {
      movAleatorio();
    }
  }
}

//Eventos Aleaotrios

function eventoAleatorio() {
  //Calcula los pasos usados paralos eventos
  restanteEvento = pasosDiarios - usadoEvento;

  if (restanteEvento > 200) {
    restanteEvento -= 200;
    usadoEvento += 200;

    var eventoAleatorio = calcularEventoAleatorio(); // Calcula el evento aleatorio

    switch (eventoAleatorio) {
      case "combate":
        combates += 1;
        console.log("Elije Combate ");
        console.log("------------------------------");

        addToFuncion(mostrarCombate(playNextFunction())); // Muestra la pantalla de combate
        combate(); // Funcion para Combate

        break;

      case "eventos":
        console.log("Eligue un evento perruno");
        console.log("------------------------------");
       
        addToFuncion(mostrarEventos(playNextFunction()));//llama para que se vea la pantalla eventos
        eventos();

        break;
      case "pocion":
        pociones += 1;
        console.log("pocion obtenida");
        console.log("------------------------------");
        addToFuncion(mostrarEventos(playNextFunction()));//llama para que se vea la pantalla eventos
        mostrarEvento("Pocion", "Pocion obtenida");
        mostrarPocion();

        break;

      default:
        break;
    }
  }
}

function eventos() {
  var eventoAleatorio = calcularEvento();

  switch (eventoAleatorio) {
    case "Meando":
      console.log("ves a un perro mear ");
      console.log("------------------------------");
      
      mostrarEvento("Meando", " ! Ves a un perro mear ¡ ");
      mostrarMeando();

      break;

    case "EncuentraPerro":
      if (perro === true) {
        console.log("el perro se canso y se fue");
        console.log("------------------------------");
        
        mostrarEvento("Sevaperro", "El perro se canso y se fue");
        mostrarMeando();
        perro = false;
      } else {
        mostrarEvento( "EncuentrasPerro", "Un perro se encariña de ti<br> ! Y te sigue ¡ " );
        mostrarMeando();
        perro = true;
      }
      break;

    default:
      break;
  }
}

function calcularEvento() {
  var randomNumber = Math.random(); // Generar un número aleatorio entre 0 y 1

  if (randomNumber < 0.6) {
    return "Meando"; // Opción 1 con 60% de probabilidad
  } else if (randomNumber < 1) {
    /*return 'Perro'; // Opción 2 con 20% de probabilidad
	  } else {*/
    return "EncuentraPerro"; // Opción 3 con 10% de probabilidad
  }
}

// Obtener todos los elementos con la clase "container"

const containers = document.querySelectorAll(".container");
const containersDatos = document.querySelectorAll(".containerDatos");

//LLamma un lisener para la funcion de tocar la pantalla
document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencias a los contenedores
  const contenedorInfo = document.getElementById("infoToque");
  const contenedordatos = document.getElementById("datosToque");

  // Agregar un evento de toque al Info
  contenedorInfo.addEventListener("touchend", function () {
    // Ocultar contenedor
    changeContainerInfo();
  });

  // Agregar un evento de toque al Datos
  contenedordatos.addEventListener("touchend", function () {
    // Ocultar contenedor2
    changeContainerDatos();
  });
});

// Función para cambiar al siguiente container
function changeContainerInfo() {
  // Ocultar el container actual
  containers[currentIndex].style.display = "none";

  // Calcular el índice del siguiente container
  currentIndex = (currentIndex + 1) % containers.length;

  // Mostrar el siguiente container
  containers[currentIndex].style.display = "block";
}

function changeContainerDatos() {
  // Ocultar el container actual
  containersDatos[currentIndexDatos].style.display = "none";

  // Calcular el índice del siguiente container
  currentIndexDatos = (currentIndexDatos + 1) % containersDatos.length;

  // Mostrar el siguiente container
  containersDatos[currentIndexDatos].style.display = "block";
}

// Mostrar el primer container al inicio
containers[currentIndex].style.display = "block";
containersDatos[currentIndexDatos].style.display = "block";

//Barra de Experiencia

function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");

  var porcentaje = (expJugador / EXPNvL) * 100;
  progressBar.style.width = porcentaje + "%";
}

//Barra de Vida

function updateVidaBar() {
  const vidaBar = document.getElementById("corazonProgressBar");

  var porcentajeVida = (jugadorSaludActual / jugadorSaludMax) * 100;
  vidaBar.style.width = porcentajeVida - 3 + "%";
}


// Calcula el evento eligiendo por porcentaje

function calcularEventoAleatorio() {
  var randomNumber = Math.random(); // Generar un número aleatorio entre 0 y 1

  if (randomNumber < 0.6) {
    return "combate"; // Opción 1 con 60% de probabilidad
  } else if (randomNumber < 0.9) {
    return "eventos"; // Opción 2 con 20% de probabilidad
  } else {
    return "pocion"; // Opción 3 con 10% de probabilidad
  }
}

// Función para manejar el evento visibilitychange

function handleVisibilityChange() {
  if (!document.hidden) {
    console.log(" se activa pantalla");
    comprobarCambioFecha();
    guardarDatos();
  }
}

// Agrega un evento listener para el evento visibilitychange
document.addEventListener("visibilitychange", handleVisibilityChange);

function obtenerFechaActual() {
  const fecha = new Date();
  const ano = fecha.getFullYear();
  const mes = fecha.getMonth() + 1; // Se suma 1 porque los meses comienzan desde 0
  const dia = fecha.getDate();
  console.log("fecha " + dia + "/" + mes + "/" + ano);

  // Retorna la fecha en el formato deseado
  return dia + "/" + mes + "/" + ano;
}

function comprobarCambioFecha() {
  const nuevaFecha = obtenerFechaActual();

  console.log("comprueva fecha");
  console.log("------------------------------");

  if (nuevaFecha !== fechaActual) {
    fechaActual = nuevaFecha;
    pasosAyer += pasosDiarios;

    console.log("La fecha ha cambiado. Nueva fecha:", nuevaFecha);

    pasosDiarios = 0; // Actualizacion a 0 al pasar de dia
    pasosUsados = 0;
    pasosRestantes = 0;
    restanteEvento = 0;
    usadoEvento = 0;
    gana = 0;
    pierde = 0;

    console.log("------------------------------");
    mostrarPasos();
  }
}
setInterval(comprobarCambioFecha, 3600000);

function mostrarPasos() {
  //console.log("mostrar pasos");
  const pasosContainer = document.getElementById("textPasos");
  pasosContainer.innerHTML = " : " + pasosDiarios;

  const ganadasContainer = document.getElementById("textBatallaGanada");
  ganadasContainer.innerHTML = " : " + gana;

  const perdidasContainer = document.getElementById("textBatallaPerdida");
  perdidasContainer.innerHTML = " : " + pierde;

  const pocionesContainer = document.getElementById("textPociones");
  pocionesContainer.innerHTML = " : " + pociones;

  const infoContainer = document.getElementById("vidaTextContainer");
  infoContainer.innerHTML = jugadorSaludActual + " / " + jugadorSaludMax;
  infoContainer.style.left = 10 + "%";

  const infoBarraContainer = document.getElementById("infoBarraContainer");
  infoBarraContainer.innerHTML = "EXP " + expJugador + " / " + EXPNvL;

  const NvlContainer = document.getElementById("Nivel");
  NvlContainer.innerHTML = "NvL: " + nivel;

  //actualiza para los eventos
  movAleatorio();
  eventoAleatorio();
}

function CordenadasY() {
  return y;
}
function CordenadasX() {
  return x;
}

// Guardar datos en el terminal
function guardarDatos() {
  try {
    console.log("Guarda datos");
    console.log("------------------------------");
    // Crea un objeto con los datos que quieres guardar
    const datosAGuardar = {
      nivel: nivel,
      jugadorSaludMax: jugadorSaludMax,
      jugadorAtaque: jugadorAtaque,
      jugadorDefensa: jugadorDefensa,
      expJugadorTotal: expJugadorTotal,
      expJugadorUsada: expJugadorUsada,
      EXPNvL: EXPNvL,
      x: x,
      y: y,
      pasosUsados: pasosUsados,
      pasosRestantes: pasosRestantes,
      pasosAyer: pasosAyer,
      pasosTotales: pasosTotales,
      restanteEvento: restanteEvento,
      usadoEvento: usadoEvento,
      pociones: pociones,
      ubicacionActual: ubicacionActual,
      ubicacionAnterior: ubicacionAnterior,
      gifImages: gifImages,
      casillasVisitadas: casillasVisitadas,
      perro: perro,
    };

    // Convierte el objeto a formato JSON
    const datosJSON = JSON.stringify(datosAGuardar);

    // Guarda los datos en el almacenamiento local
    localStorage.setItem("datos", datosJSON);
  } catch (error) {
    console.error("Error al guardar datos:", error);
  }
}

//Recupera Los datos

function recuperarDatos() {
  try {
    // Recupera los datos almacenados en formato JSON
    const datosJSON = localStorage.getItem("datos");

    console.log("comprueva Datos Guardados");
    console.log("------------------------------");

    if (datosJSON) {
      // Convierte los datos de JSON a un objeto JavaScript
      const datosRecuperados = JSON.parse(datosJSON);

      console.log("Se recueran los datos");
      console.log("--------------------------------------");

      // Asigna los valores recuperados a las variables correspondientes
      nivel = datosRecuperados.nivel;
      jugadorSaludMax = datosRecuperados.jugadorSaludMax;
      jugadorAtaque = datosRecuperados.jugadorAtaque;
      jugadorDefensa = datosRecuperados.jugadorDefensa;
      expJugadorTotal = datosRecuperados.expJugadorTotal;
      expJugadorUsada = datosRecuperados.expJugadorUsada;
      EXPNvL = datosRecuperados.EXPNvL;
      perro = perro;
      x = datosRecuperados.x;
      y = datosRecuperados.y;
      pasosDiarios = datosRecuperados.pasosDiarios;
      pasosUsados = datosRecuperados.pasosUsados;
      pasosRestantes = datosRecuperados.pasosRestantes;
      pasosTotales = datosRecuperados.pasosTotales;
      pasosAyer = datosRecuperados.pasosAyer;
      restanteEvento = datosRecuperados.restanteEvento;
      usadoEvento = datosRecuperados.usadoEvento;
      pociones = datosRecuperados.pociones;
      ubicacionActual = datosRecuperados.ubicacionActual;
      ubicacionAnterior = datosRecuperados.ubicacionAnterior;
      gifImages = datosRecuperados.gifImages;
      casillasVisitadas = datosRecuperados.casillasVisitadas;
    }
  } catch (error) {
    console.error("Error al recuperar datos:", error);
  }
}

//Definir una cola para las funciones de reproducción de GIFs
function reproducirGif(gifPath, container) {
  // Detener el GIF activo actual antes de reproducir el nuevo
  gifActivoContainer.style.display = "none"; // Ocultar el GIF activo
  gifCaballeroContainer.style.display = "block";

  const gifImage = new Image();
  gifImage.src = gifPath;
  gifImage.className = "caballeroGifEvento";

  gifImage.onload = function () {
    // Si no hay GIF adicional, volver a reproducir el GIF activo original después del tiempo de espera
    setTimeout(function () {
      gifActivoContainer.style.display = "block"; // Mostrar el GIF activo nuevamente
      gifCaballeroContainer.style.display = "none";
    }, 10000);
  };

  container.innerHTML = "";
  container.appendChild(gifImage);
}

function siguienteGif() {
  if (gifQueue.length >= 1) {
    // Si hay más GIFs en la cola, reproducir el siguiente
    const siguienteGifFunc = gifQueue.shift();
    siguienteGifFunc(siguienteGif); // Pasar la función siguienteGif como callback
  }
}
//Funcion para llamar gif de Datos
function agregarGifEnCola(gifPath, container) {
  gifQueue.push(function (callback) {
    reproducirGif(gifPath, container, callback);
  });

  // Verificar si es la primera función en la cola
  if (gifQueue.length === 1) {
    // Iniciar la reproducción del GIF
    siguienteGif();
  }
}

function inicio() {
  recuperarDatos();
  updateVidaBar();
  updateProgressBar();
  mostrarMapa();
  paisajeFondo();
  mostrarGif();
  estadisticasJugador();
  if (perro === true) {
    mostrarPerro();
  }
}

window.onload = inicio();
