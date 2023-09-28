
/*----------------------------VARIABLES---------------------------*/


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
const gifPocionContainer = document.getElementById("pociones");
const caballeroLuchaPath = "images/Gif/Caballero/caballeroLuchando1.gif";
const caballeroMuertePath = "images/Gif/Caballero/caballeroMuerto1.gif";
const pocionLlenaPath = "images/Gif/Eventos/pocionGifLlena.gif";
const pocionVaciandosePath = "images/Gif/Eventos/pocionVaciandose.gif";
const pocionVaciaPath = "images/PNG/Iconos/pocionVacia.png";

const gifActivoContainer = document.getElementById("caballeroQuieto");

//Inicializar el índice para el container actual
var currentIndex = 0;
var currentIndexDatos = 0;

//Posicion inicial en el mapa
let x = 5; //Columna
let y = 3; // Fila

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
const velocidadEscritura = 50; // Ajusta la velocidad de escritura en milisegundos
var tiempoEspera = 30000;
var tiempoCallback = 1000;
var tiempoCallback2 = 1000;
var pasosProximoEvento = 0;
var usadoEvento = 0;
var combates = 0;
var gana = 0;
var pierde = 0;
var pociones = 0;
var botonPocion = document.getElementById("botonPocion");//Boton para usar pocion


var fechaActual = obtenerFechaActual();
var ubicacionActual;
var ubicacionAnterior;
var gifImages = [];
var rastroImages= [];
var rastroUbicacion=[];
var casillasVisitadas = [];
const maxCasillasVisitadas =2;
const maxRastroLength = 5;

// Obtener todos los elementos con la clase "container"
const containers = document.querySelectorAll(".container");
const containersDatos = document.querySelectorAll(".containerDatos");

// Mostrar el primer container al inicio
containers[currentIndex].style.display = "block";
containersDatos[currentIndexDatos].style.display = "block";

// Agrega un evento listener para el evento visibilitychange
document.addEventListener("visibilitychange", handleVisibilityChange);

/*---------------------------------FUNCIONES-------------------------------------------*/

//Funcion para colocar Gif en mapa
function mostrarGif() {
  // Imagen de Archivo
  const caballeroPath = "images/Gif/Caballero/caballeroCorriendo.gif";

  // Crea una contenedor IMG en HTML
  const caballeroImage = document.createElement("img");
  caballeroImage.src = caballeroPath;
  caballeroImage.className = "gifOverlay caballeroSize";

  // Establece la ubicacion de IMG dentro del contenedor
  ubicacionActual =document.getElementById("mapContainer").children[(y - 1) * 10 + (x - 1)];
  ubicacionAnterior = ubicacionActual;

  // Coloca la imagen
  ubicacionActual.appendChild(caballeroImage);

  gifImages.push(caballeroImage);
}
// Calcula el movimiento en el mapa y la aposicion del gif 
function movAleatorio() {
  //actualiza los datos de pasos
  pasosTotales = stepTotal ;
  // Comprueva que no haya descuadre negativo con los pasos
  if (pasosTotales < pasosAyer) {
    pasosAyer = pasosTotales;
  } else {
     ubicacionAnterior = ubicacionActual;
    pasosDiarios =pasosTotales - pasosAyer;
    pasosRestantes = pasosDiarios - pasosUsados;
  }
  

  if (pasosRestantes >= 3300) {
  
    pasosUsados += 3300;

    const numAleatorio = Math.floor(Math.random() * 4) + 1;

    let nuevaX = x;
    let nuevaY = y;

    // Lógica para determinar la nueva posición (nuevaX, nuevaY) basada en numAleatorio

    switch (numAleatorio) {
      case 1: // Arriba
        if (y > 1) {
          nuevaY = y - 1;
        }
        break;

      case 2: // Abajo
        if (y < 6) {
          nuevaY = y + 1;
        }
        break;

      case 3: // Izquierda
        if (x > 1) {
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
      //console.log("Coloca Nueva Ubicacion en el Mapa");
      //console.log("------------------------------");
      casillasVisitadas.push(ubicacionAnterior);
      //ubicacionAnterior.removeChild(ubicacionAnterior.firstChild);
      ubicacionActual = nuevaUbicacion;
      y = nuevaY;
      x = nuevaX;

     console.log("Ubicacion nueva " + y + " , " + x);
      console.log("------------------------------");

      //actualiza el paisaje
      paisajeFondo();

      

      //Crea el rastro en el mapa
      const rastroImage = document.createElement("img"); //Crea contenedor IMG
      rastroImage.src = "images/rastro.gif"; // Imagen de archivo
      rastroImage.className = "rastroSize"; // Le pone una clase al Contenedor IMG
      ubicacionAnterior.appendChild(rastroImage); // Agregar rastro en ubicación anterior
      rastroImages.push(ubicacionAnterior);
      //rastroUbicacion.push(ubicacionAnterior);

      console.log("Coloca rastro");
      console.log("------------------------------");


     ubicacionActual.appendChild(gifImages[gifImages.length - 1]);


      // Verificar las casillas visitadas y eliminar el exceso si supera maxCasillasVisitadas
      if (casillasVisitadas.length > maxCasillasVisitadas) {
        casillasVisitadas.shift();
       console.log("borra casilla visitada "+casillasVisitadas.length);
      console.log("------------------------------");
      }
      //Comprueba si el rastro es mayor al maximo y borra el dato mas antiguo
      if (rastroImages.length> maxRastroLength) {
       
       const rastroAntiguo= rastroImages.shift();// Eliminar la referencia al rastro más antiguo en el arreglo
       rastroAntiguo.removeChild(rastroAntiguo.firstChild);
        
      
        console.log("Ubicacion : " + rastroImages.length);
        console.log("------------------------------");
      }
    } else {
      pasosUsados -= 3300;
      movAleatorio();
    }
  }
}

//Eventos Aleaotrios
function eventoAleatorio() {
    
  //Calcula los pasos usados paralos eventos
  if(pasosDiarios<usadoEvento){
    usadoEvento=pasosDiarios;
  }
  pasosProximoEvento = pasosDiarios - usadoEvento;


  if (pasosProximoEvento > 632) {
    
    usadoEvento += 632;

    var eventoAleatorio = calcularEventoAleatorio(); // Calcula el evento aleatorio

    switch (eventoAleatorio) {
      case "combate":
        combates += 1;
        //console.log("Elije Combate ");
        //console.log("------------------------------");

        addToFuncion(combate); // Funcion para Combate

        break;

      case "eventos":
        //console.log("Eligue un evento perruno");
        //console.log("------------------------------");

        addToFuncion(eventos);

        break;
      case "pocion":
        pociones += 1;
        //console.log("pocion obtenida");
        //console.log("------------------------------");
        addToFuncion(function(){
          mostrarPantallaEventos("Pocion", "Pocion obtenida")
        });
        
        

        

        break;

      default:
        break;
    }
  }
}

// Elije un evento aleatorio
function eventos() {
  var eventoAleatorio = calcularEvento();

  switch (eventoAleatorio) {
    case "Meando":
      //console.log("ves a un perro mear ");
      //console.log("------------------------------");

     
        mostrarPantallaEventos("Meando", " ! Ves a un perro mear ¡ ");
      
            
      

      break;

    case "EncuentraPerro":
      if (perro === true) {
        //console.log("el perro se canso y se fue");
        //console.log("------------------------------");
        perro= false;
        
          mostrarPantallaEventos("Sevaperro", "El perro se canso y se fue ");
       
        
        

        
      } else {
        perro=true;
       
          mostrarPantallaEventos("EncuentrasPerro",
          "Un perro se encariña de ti<br> ! Y te sigue ¡ ");
       
               
       

        
      }
      break;

    default:
      break;
  }
}
// Calcula en porcentaje  la proablidad de tipos de evento
function calcularEvento() {
  var randomNumber = Math.random(); // Generar un número aleatorio entre 0 y 1

  if (randomNumber < 0.8) {
    return "Meando"; // Opción 1 con 60% de probabilidad
  } else if (randomNumber < 1) {
    /*return 'Perro'; // Opción 2 con 20% de probabilidad
	  } else {*/
    return "EncuentraPerro"; // Opción 3 con 10% de probabilidad
  }
}

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
    //guardarDatos();
    
  });
});

// Función para cambiar al siguiente container de Info
function changeContainerInfo() {
  // Ocultar el container actual
  containers[currentIndex].style.display = "none";

  // Calcular el índice del siguiente container
  currentIndex = (currentIndex + 1) % containers.length;

  // Mostrar el siguiente container
  containers[currentIndex].style.display = "block";
}

// Cambia las pantallas de Datos
function changeContainerDatos() {
  // Ocultar el container actual
  containersDatos[currentIndexDatos].style.display = "none";

  // Calcular el índice del siguiente container
  currentIndexDatos = (currentIndexDatos + 1) % containersDatos.length;

  // Mostrar el siguiente container
  containersDatos[currentIndexDatos].style.display = "block";
}

//Barra de Experiencia
function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");

  var porcentaje = (expJugador / EXPNvL) * 100;
  progressBar.style.width = porcentaje + "%";
  mostrarPasos();
}

//Barra de Vida
function updateVidaBar() {
  const vidaBar = document.getElementById("corazonProgressBar");

  var porcentajeVida = (jugadorSaludActual / jugadorSaludMax) * 100;
  vidaBar.style.width = porcentajeVida - 3 + "%";
  mostrarPasos();
}

// Calcula el evento eligiendo por porcentaje
function calcularEventoAleatorio() {
  var randomNumber = Math.random(); // Generar un número aleatorio entre 0 y 1

  if (randomNumber < 0.6) {
    return "combate"; // Opción 1 con 60% de probabilidad
  } else if (randomNumber < 0.93) {
    return "eventos"; // Opción 2 con 20% de probabilidad
  } else {
    return "pocion"; // Opción 3 con 10% de probabilidad
  }
}

// Función para manejar el evento visibilitychange
function handleVisibilityChange() {
  if (!document.hidden) {
    //console.log(" se activa pantalla");
    comprobarCambioFecha();

    guardarDatos();
  }
}

function obtenerFechaActual() {
  const fecha = new Date();
  const ano = fecha.getFullYear();
  const mes = fecha.getMonth() + 1; // Se suma 1 porque los meses comienzan desde 0
  const dia = fecha.getDate();
  //console.log("fecha " + dia + "/" + mes + "/" + ano);

  // Retorna la fecha en el formato deseado
  return dia + "/" + mes + "/" + ano;
}

function comprobarCambioFecha() {
  const nuevaFecha = obtenerFechaActual();

  //console.log("comprueva fecha");
  //console.log("------------------------------");

  if (nuevaFecha !== fechaActual) {
    fechaActual = nuevaFecha;
    pasosAyer += pasosDiarios;

    //console.log("La fecha ha cambiado. Nueva fecha:", nuevaFecha);

    // Actualizacion a 0 al pasar de dia
    pasosUsados = 0;
    
    usadoEvento = 0;
    gana = 0;
    pierde = 0;

    //console.log("------------------------------");
    mostrarPasos();
  }
}
setInterval(comprobarCambioFecha, 3600000);

function mostrarPasos() {
  ////console.log("mostrar pasos");
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
// Guardar datos en las preferencias del sistema
function guardarDatos() {
  try {
    //console.log("GUARDA DATOS");
    //console.log("------------------------------");
    //console.log("DATOS GUARDADOS");
    //console.log("fechaActual:", fechaActual);
    //console.log("nivel:", nivel);
    //console.log("jugadorSaludMax:", jugadorSaludMax);
    //console.log("jugadorAtaque:", jugadorAtaque);
    //console.log("jugadorDefensa:", jugadorDefensa);
    //console.log("expJugadorTotal:", expJugadorTotal);
    //console.log("expJugadorUsada:", expJugadorUsada);
    //console.log("expJugador:", expJugador);
    //console.log("EXPNvL:", EXPNvL);
    //console.log("perro:", perro);
    //console.log("pasosUsados:", pasosUsados);
    //console.log("pasosAyer:", pasosAyer);
    //console.log("usadoEvento:", usadoEvento);
    //console.log("combates:", combates);
    //console.log("gana:", gana);
    //console.log("pierde:", pierde);
    //console.log("pociones:", pociones);
    


    tizen.preference.setValue("jugadorSaludMax", jugadorSaludMax);
    tizen.preference.setValue("fechaActual", fechaActual);
    tizen.preference.setValue("jugadorAtaque", jugadorAtaque);
    tizen.preference.setValue("jugadorDefensa", jugadorDefensa);
    tizen.preference.setValue("expJugadorTotal", expJugadorTotal);
    tizen.preference.setValue("expJugadorUsada", expJugadorUsada);
    tizen.preference.setValue("expJugador", expJugador);
    tizen.preference.setValue("EXPNvL", EXPNvL);
    tizen.preference.setValue("perro", perro);
    tizen.preference.setValue("pasosUsados", pasosUsados);
    tizen.preference.setValue("pasosAyer", pasosAyer);
    tizen.preference.setValue("usadoEvento", usadoEvento);
    tizen.preference.setValue("combates", combates);
    tizen.preference.setValue("gana", gana);
    tizen.preference.setValue("pierde", pierde);
    tizen.preference.setValue("pociones", pociones);
    tizen.preference.setValue("nivel", nivel);

  } catch (error) {
    console.error("Error al guardar datos:", error);
  }
}

// Recuperar datos de las preferencias del sistema
function recuperarDatos() {
  try {
    //console.log("RECUPERA DATOS");
    //console.log("------------------------------");

    jugadorSaludMax = tizen.preference.getValue("jugadorSaludMax") || 50;
    jugadorAtaque = tizen.preference.getValue("jugadorAtaque") || 15;
    jugadorDefensa = tizen.preference.getValue("jugadorDefensa") || 10;
    expJugadorTotal = tizen.preference.getValue("expJugadorTotal") || 0;
    expJugadorUsada = tizen.preference.getValue("expJugadorUsada") || 0;
    expJugador = tizen.preference.getValue("expJugador") || 0;
    EXPNvL = tizen.preference.getValue("EXPNvL") || 100;
    perro = tizen.preference.getValue("perro") || false;
    pasosUsados = tizen.preference.getValue("pasosUsados") || 0;
    pasosAyer = tizen.preference.getValue("pasosAyer") || 0;
    usadoEvento = tizen.preference.getValue("usadoEvento") || 0;
    combates = tizen.preference.getValue("combates") || 0;
    gana = tizen.preference.getValue("gana") || 0;
    pierde = tizen.preference.getValue("pierde") || 0;
    pociones = tizen.preference.getValue("pociones") || 0;
    nivel = tizen.preference.getValue("nivel") ||1;
    fechaActual = tizen.preference.getValue("fechaActual") ;

    //console.log("DATOS RECUPERADOS");
    //console.log("fechaActual:", fechaActual);
    //console.log("nivel:", nivel);
    //console.log("jugadorSaludMax:", jugadorSaludMax);
    //console.log("jugadorAtaque:", jugadorAtaque);
    //console.log("jugadorDefensa:", jugadorDefensa);
    //console.log("expJugadorTotal:", expJugadorTotal);
    //console.log("expJugadorUsada:", expJugadorUsada);
    //console.log("expJugador:", expJugador);
    //console.log("EXPNvL:", EXPNvL);
    //console.log("perro:", perro);
    //console.log("pasosDiarios:", pasosDiarios);
    //console.log("pasosUsados:", pasosUsados);
    //console.log("pasosRestantes:", pasosRestantes);
    //console.log("pasosTotales:", pasosTotales);
    //console.log("pasosAyer:", pasosAyer);
    //console.log("usadoEvento:", usadoEvento);
    //console.log("combates:", combates);
    //console.log("gana:", gana);
    //console.log("pierde:", pierde);
    //console.log("pociones:", pociones);
  } catch (error) {
    console.error("Error al recuperar datos:", error.message);
    console.error("Error stack trace:", error.stack);
  }
}

// Función para llamar gif de Datos
async function agregarGifEnCola(gifPath, container) {
  gifQueue.push(function (callback) {
    reproducirGif(gifPath, container, callback);
  });

  // Verificar si es la primera función en la cola
  if (gifQueue.length === 1) {
    await siguienteGif();
  }
}

// Definir una cola para las funciones de reproducción de GIFs
async function reproducirGif(gifPath, container, callback) {
  // Detener el GIF activo actual antes de reproducir el nuevo
  gifActivoContainer.style.display = "none";
  container.innerHTML = ""; // Limpiar el contenido anterior
  const gifImage = new Image();
  gifImage.src = gifPath;
  gifImage.className = "caballeroGifEvento";

  gifImage.onload = function () {
    container.appendChild(gifImage);
    // Si no hay GIF adicional, volver a mostrar el contenido original después del tiempo de espera
    setTimeout(function () {
      container.innerHTML = "";
      gifActivoContainer.style.display = "block";
      callback(); // Llamar a la función de callback para reproducir el siguiente GIF en la cola
    }, 3000);
  };
}

async function siguienteGif() {
  if (gifQueue.length >= 1) {
    // Si hay más GIFs en la cola, reproducir el siguiente
    const siguienteGifFunc = gifQueue.shift();
    
    await siguienteGifFunc(siguienteGif); // Pasar la función siguienteGif como callback
  }
}


 // Asociar un evento de clic al botón
 botonPocion.addEventListener("click", function() {
  // Llamar a la función que deseas activar cuando se presione el botón
  usarPocion();
});

function inicio() {
  mostrarMapa();
  paisajeFondo();
  mostrarGif();  
  recuperarDatos();
  
  updateVidaBar();
  updateProgressBar();  
  textoEstadisticaJugador();
  mostrarPasos()
 

  if (perro === true) {
    mostrarGiFPerro();
  }
}

window.onload = inicio();
