let interval;

//Oculta y hace aparecer los textos

async function mostrarPantallaCombate(nombreJugador, nombreEnemigo, resultado) {
  const combateDiv = document.getElementById("combate");
  const eventosDiv = document.getElementById("eventos");
  const hogueraDiv = document.getElementById("hoguera");
  const estrellasDiv = document.getElementById("estrellas");
  const estadisticasDiv = document.getElementById("Datos");

  const nombreJugadorContainer = document.getElementById("textNombreJugador");
  const nombreEnemigoContainer = document.getElementById("textNombreEnemigo");
  const textoCombateContainer = document.getElementById("textoCombate");

  var jugador = "";
  var enemigo = "";
  var textcombate = "";
  console.log("PANTALLA COMBATE");
  console.log("--------------------------------------------------");

  currentIndex = 1; // Al llamar la funcion pone el index en la pantalla que muestra

  combateDiv.style.display = "block";
  eventosDiv.style.display = "none";
  hogueraDiv.style.display = "none";
  estrellasDiv.style.display = "none";
  estadisticasDiv.style.display = "none";

  function mostrarTextoCombate(texto, contenedor) {
    // Función para ejecutar la animación de texto
    function animarTexto() {
      contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor

      var index = 0;
      const intervalo = setInterval(function () {
        const char = texto.charAt(index);
        if (char === "<") {
          // Avanzar hasta el final de la etiqueta
          const finalEtiqueta = texto.indexOf(">", index) + 1;
          contenedor.innerHTML += texto.substring(index, finalEtiqueta);
          index = finalEtiqueta;
        } else {
          contenedor.innerHTML += char;
          index++;
        }

        if (index >= texto.length) {
          clearInterval(intervalo);

          // Verificar si hay más animaciones en la cola
          if (animacionCombateQueue.length > 0) {
            const siguienteAnimacion = animacionCombateQueue.shift();
            siguienteAnimacion();
          }
        }
      }, velocidadEscritura);
    }

    // Agregar la animación actual a la cola
    animacionCombateQueue.push(animarTexto);

    // Verificar si es la primera animación en la cola
    if (animacionCombateQueue.length === 1) {
      // Iniciar la animación
      animarTexto();
    }
  }
  console.log("TEXTO");
  console.log("--------------------------------------------------");

  // Mostrar nombre del jugador
  jugador = nombreJugador;
  // nombreJugadorContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoCombate(jugador, nombreJugadorContainer);

  // Mostrar nombre del enemigo
  enemigo = nombreEnemigo;
  //nombreEnemigoContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoCombate(enemigo, nombreEnemigoContainer);

  // Mostrar texto de combate
  textcombate = resultado;
  // textoCombateContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoCombate(textcombate, textoCombateContainer);
}

async function mostrarPantallaEventos(tipoEvento, textoEvento) {
  const combateDiv = document.getElementById("combate");
  const eventosDiv = document.getElementById("eventos");
  const hogueraDiv = document.getElementById("hoguera");
  const pocionDiv = document.getElementById("pociones");
  const meandoDiv = document.getElementById("meando");
  const estrellasDiv = document.getElementById("estrellas");
  const estadisticasDiv = document.getElementById("Datos");

  const textoEventosContainer = document.getElementById("textoEventos");


  currentIndex = 2; // Al llamar la funcion pone el index en la pantalla que muestra

  combateDiv.style.display = "none";
  eventosDiv.style.display = "block";
  hogueraDiv.style.display = "none";
  estrellasDiv.style.display = "none";
  estadisticasDiv.style.display = "none";

   // Mostrar el evento en el contenedor
   function mostrarTextoEvento(texto, contenedor) {
    // Función para ejecutar la animación de texto
    function animarTexto() {
      contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor

      let index = 0;
      const intervalo = setInterval(function () {
        const char = texto.charAt(index);
        if (char === "<") {
          // Avanzar hasta el final de la etiqueta
          const finalEtiqueta = texto.indexOf(">", index) + 1;
          contenedor.innerHTML += texto.substring(index, finalEtiqueta);
          index = finalEtiqueta;
        } else {
          contenedor.innerHTML += char;
          index++;
        }

        if (index >= texto.length) {
          clearInterval(intervalo);

          // Verificar si hay más animaciones en la cola
          if (animacionEventoQueue.length > 0) {
            const siguienteAnimacion = animacionEventoQueue.shift();
            siguienteAnimacion();
          }
        }
      }, velocidadEscritura);
    }

    // Agregar la animación actual a la cola
    animacionEventoQueue.push(animarTexto);

    // Verificar si es la primera animación en la cola
    if (animacionEventoQueue.length === 1) {
      // Iniciar la animación
      animarTexto();
    }
  }

  // Muestra el texto de Evento
  textoEventosContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoEvento(textoEvento, textoEventosContainer);
}

async function mostrarPantallaHoguera() {
  const combateDiv = document.getElementById("combate");
  const eventosDiv = document.getElementById("eventos");
  const hogueraDiv = document.getElementById("hoguera");
  const estrellasDiv = document.getElementById("estrellas");
  const estadisticasDiv = document.getElementById("Datos");
  const textoHogueraContainer = document.getElementById("textoHoguera");
  
  var texto = " ";
  currentIndex = 3; // Al llamar la funcion pone el index en la pantalla que muestra

  combateDiv.style.display = "none";
  eventosDiv.style.display = "none";
  hogueraDiv.style.display = "block";
  estrellasDiv.style.display = "none";
  estadisticasDiv.style.display = "none";

   // Actualiza datos en pantalla
   updateVidaBar();
   updateProgressBar();
   guardarDatos();

  console.log("PANTALLA HOGUERA");
  console.log("------------------------------");

  function mostrarTextoHoguera(texto, contenedor) {
    // Función para ejecutar la animación de texto
    function animarTexto() {
      contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor

      var index = 0;
      const intervalo = setInterval(function () {
        const char = texto.charAt(index);
        if (char === "<") {
          // Avanzar hasta el final de la etiqueta
          const finalEtiqueta = texto.indexOf(">", index) + 1;
          contenedor.innerHTML += texto.substring(index, finalEtiqueta);
          index = finalEtiqueta;
        } else {
          contenedor.innerHTML += char;
          index++;
        }

        if (index >= texto.length) {
          clearInterval(intervalo);

          // Verificar si hay más animaciones en la cola
          if (animacionHogueraQueue.length > 0) {
            const siguienteAnimacion = animacionHogueraQueue.shift();
            siguienteAnimacion();
          }
        }
      }, velocidadEscritura);
    }

    // Agregar la animación actual a la cola
    animacionHogueraQueue.push(animarTexto);

    // Verificar si es la primera animación en la cola
    if (animacionHogueraQueue.length === 1) {
      // Iniciar la animación
      animarTexto();
    }
  }

  // Mostrar texto
  texto =
    "Fuistes derrotado por " +
    enemigo.nombre +
    ", <br>Te recuperas en la Hoguera";
  textoHogueraContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoHoguera(texto, textoHogueraContainer);

}
function mostrarEstrellas() {
  const combateDiv = document.getElementById("combate");
  const eventosDiv = document.getElementById("eventos");
  const hogueraDiv = document.getElementById("hoguera");
  const estrellasDiv = document.getElementById("estrellas");
  const estadisticasDiv = document.getElementById("Datos");

  currentIndex = 0; // Al llamar la funcion pone el index en la pantalla que muestra

  combateDiv.style.display = "none";
  eventosDiv.style.display = "none";
  hogueraDiv.style.display = "none";
  estrellasDiv.style.display = "block";
  estadisticasDiv.style.display = "none";
}

async function mostrarPantallaEstadisticas() {
  const combateDiv = document.getElementById("combate");
  const eventosDiv = document.getElementById("eventos");
  const hogueraDiv = document.getElementById("hoguera");
  const estrellasDiv = document.getElementById("estrellas");
  const estadisticasDiv = document.getElementById("Datos");

  currentIndex = 4; // Al llamar la funcion pone el index en la pantalla que muestra

  combateDiv.style.display = "none";
  eventosDiv.style.display = "none";
  hogueraDiv.style.display = "none";
  estrellasDiv.style.display = "none";
  estadisticasDiv.style.display = "block";
}

function mostrarGifPocion() {
  const pocionDiv = document.getElementById("pociones");
  const meandoDiv = document.getElementById("meando");

  meandoDiv.style.display = "none";
  pocionDiv.style.display = "block";
}

function mostrarGifMeando() {
  const pocionDiv = document.getElementById("pociones");
  const meandoDiv = document.getElementById("meando");

  meandoDiv.style.display = "block";
  pocionDiv.style.display = "none";
}
function mostrarGiFPerro() {
  const perroDiv = document.getElementById("perroContainer");
  perroDiv.style.display = "block";
}

function mostrarSevaGifPerro() {
  const perroDiv = document.getElementById("perroContainer");
  perroDiv.style.display = "none";
}

function mostrarSubida() {
  const fuerzaDiv = document.getElementById("fuerza");
  const defensaDiv = document.getElementById("defensa");
  const vidaDiv = document.getElementById("vida");

  fuerzaDiv.style.display = "block";
  defensaDiv.style.display = "block";
  vidaDiv.style.display = "block";
}
function esconderSubida() {
  const fuerzaDiv = document.getElementById("fuerza");
  const defensaDiv = document.getElementById("defensa");
  const vidaDiv = document.getElementById("vida");

  fuerzaDiv.innerHTML = "";
  defensaDiv.innerHTML = "";
  vidaDiv.innerHTML = "";

  fuerzaDiv.style.display = "none";
  defensaDiv.style.display = "none";
  vidaDiv.style.display = "none";
}

//Función para agregar una función a la cola de reproducción
async function addToFuncion(func) {
  functionArray.push(func);
  console.log("METO FUNCION " + functionArray.length);
  console.log("--------------------------------------------------");

  
  // Si es la primera función en la cola, iniciar la reproducción
  if (functionArray.length === 1) {
    console.log("LE DOY PLAY");
  console.log("--------------------------------------------------");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await playNextFunction();
  }
}

// Función para reproducir la siguiente función en la cola
async function playNextFunction() {
  if (functionArray.length >= 1) {
    const nextFunction = functionArray.shift();

    console.log("LLAMA NEXT " + functionArray.length);
    console.log("--------------------------------------------");
    
    
     nextFunction();

    console.log("LLAMA OTRA FUNCION");
    console.log("--------------------------------------------");

    await new Promise((resolve) => setTimeout(resolve, 10000));
    await playNextFunction(); // Llamar a la siguiente función en la cola
  }
}
function waitForFourSeconds() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

// Función para comprobar periódicamente si hay funciones en la cola para reproducir
 function checkFunctionQueue() {
  console.log("LLAMA AUTOMATICA");
  console.log("--------------------------------------------");

  if (functionArray.length > 0) {
    console.log("LLAMA PLAYFUNCION");
    console.log("--------------------------------------------");

    // Si hay funciones en la cola, ejecutar la siguiente función
     playNextFunction();
  } else {
    // Si la cola está vacía, detener el intervalo
    clearInterval(interval);
    console.log("Cola de funciones vacía. Deteniendo comprobación automática.");
  }
}

//Texto para los Eventos
function mostrarEvento(tipoEvento, textoEvento, callback) {
  const textoEventosContainer = document.getElementById("textoEventos");

  // Mostrar el evento en el contenedor
  function mostrarTextoEvento(texto, contenedor) {
    // Función para ejecutar la animación de texto
    function animarTexto() {
      contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor

      let index = 0;
      const intervalo = setInterval(function () {
        const char = texto.charAt(index);
        if (char === "<") {
          // Avanzar hasta el final de la etiqueta
          const finalEtiqueta = texto.indexOf(">", index) + 1;
          contenedor.innerHTML += texto.substring(index, finalEtiqueta);
          index = finalEtiqueta;
        } else {
          contenedor.innerHTML += char;
          index++;
        }

        if (index >= texto.length) {
          clearInterval(intervalo);

          // Verificar si hay más animaciones en la cola
          if (animacionEventoQueue.length > 0) {
            const siguienteAnimacion = animacionEventoQueue.shift();
            siguienteAnimacion();
          }
        }
      }, velocidadEscritura);
    }

    // Agregar la animación actual a la cola
    animacionEventoQueue.push(animarTexto);

    // Verificar si es la primera animación en la cola
    if (animacionEventoQueue.length === 1) {
      // Iniciar la animación
      animarTexto();
    }
  }

  // Muestra el texto de Evento
  textoEventosContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoEvento(textoEvento, textoEventosContainer);

  setTimeout(callback, tiempoCallback2);
}

// Muestra la pantalla de hoguera y actualiza texto
function recuperarseHoguera(callback) {
  const textoHogueraContainer = document.getElementById("textoHoguera");
  var texto = " ";

  console.log("Descansas en la Hoguera");
  console.log("------------------------------");
  jugadorSaludActual = jugadorSaludMax;

  // Actualiza datos en pantalla
  updateVidaBar();
  updateProgressBar();
  guardarDatos();

  function mostrarTextoHoguera(texto, contenedor) {
    // Función para ejecutar la animación de texto
    function animarTexto() {
      contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor

      var index = 0;
      const intervalo = setInterval(function () {
        const char = texto.charAt(index);
        if (char === "<") {
          // Avanzar hasta el final de la etiqueta
          const finalEtiqueta = texto.indexOf(">", index) + 1;
          contenedor.innerHTML += texto.substring(index, finalEtiqueta);
          index = finalEtiqueta;
        } else {
          contenedor.innerHTML += char;
          index++;
        }

        if (index >= texto.length) {
          clearInterval(intervalo);

          // Verificar si hay más animaciones en la cola
          if (animacionHogueraQueue.length > 0) {
            const siguienteAnimacion = animacionHogueraQueue.shift();
            siguienteAnimacion();
          }
        }
      }, velocidadEscritura);
    }

    // Agregar la animación actual a la cola
    animacionHogueraQueue.push(animarTexto);

    // Verificar si es la primera animación en la cola
    if (animacionHogueraQueue.length === 1) {
      // Iniciar la animación
      animarTexto();
    }
  }

  // Mostrar texto
  texto =
    "Fuistes derrotado por " +
    enemigo.nombre +
    ", <br>Te recuperas en la Hoguera";
  textoHogueraContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoHoguera(texto, textoHogueraContainer);

  setTimeout(callback, tiempoCallback2);
}

// Muestra el texto de las estadisticas del Jugador
function estadisticasJugador(callback) {
  //Contenedores donde va el texto
  const textoEstadisticaContainer = document.getElementById(
    "textoEstadisticasJugador"
  );
  const textoNvlContainer = document.getElementById("textNvlJugador");

  var texto = " ";
  var Nvl = " ";

  function mostrarTextoEstadistica(texto, contenedor) {
    // Función para ejecutar la animación de texto
    contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor
    function animarTexto() {
      contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor

      var index = 0;
      const intervalo = setInterval(function () {
        const char = texto.charAt(index);
        if (char === "<") {
          // Avanzar hasta el final de la etiqueta
          const finalEtiqueta = texto.indexOf(">", index) + 1;
          contenedor.innerHTML += texto.substring(index, finalEtiqueta);
          index = finalEtiqueta;
        } else {
          contenedor.innerHTML += char;
          index++;
        }

        if (index >= texto.length) {
          clearInterval(intervalo);

          // Verificar si hay más animaciones en la cola
          if (animacionEstadisticaQueue.length > 0) {
            const siguienteAnimacion = animacionEstadisticaQueue.shift();
            siguienteAnimacion();
          }
        }
      }, velocidadEscritura);
    }

    // Agregar la animación actual a la cola
    animacionEstadisticaQueue.push(animarTexto);

    // Verificar si es la primera animación en la cola
    if (animacionEstadisticaQueue.length === 1) {
      // Iniciar la animación
      animarTexto();
    }
  }

  // Muestrar Nivel
  Nvl = "NvL " + nivel;
  textoNvlContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoEstadistica(Nvl, textoNvlContainer);

  // Muestrar Estadisticas
  texto =
    "Fuerza : " +
    jugadorAtaque +
    "<br>Defensa : " +
    jugadorDefensa +
    "<br>Vida Max : " +
    jugadorSaludMax +
    "<br>ExpTotal : " +
    expJugador +
    "/" +
    EXPNvL;
  textoEstadisticaContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoEstadistica(texto, textoEstadisticaContainer);

  //addToFuncion(mostrarPantallaEstadisticas(playNextFunction()));
  setTimeout(callback, tiempoCallback2);
}

// Texto En combate
function combateTexto(nombreJugador, nombreEnemigo, resultado, callback) {
  const nombreJugadorContainer = document.getElementById("textNombreJugador");
  const nombreEnemigoContainer = document.getElementById("textNombreEnemigo");
  const textoCombateContainer = document.getElementById("textoCombate");

  var jugador = "";
  var enemigo = "";
  var textcombate = "";

  function mostrarTextoCombate(texto, contenedor) {
    // Función para ejecutar la animación de texto
    function animarTexto() {
      contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor

      var index = 0;
      const intervalo = setInterval(function () {
        const char = texto.charAt(index);
        if (char === "<") {
          // Avanzar hasta el final de la etiqueta
          const finalEtiqueta = texto.indexOf(">", index) + 1;
          contenedor.innerHTML += texto.substring(index, finalEtiqueta);
          index = finalEtiqueta;
        } else {
          contenedor.innerHTML += char;
          index++;
        }

        if (index >= texto.length) {
          clearInterval(intervalo);

          // Verificar si hay más animaciones en la cola
          if (animacionCombateQueue.length > 0) {
            const siguienteAnimacion = animacionCombateQueue.shift();
            siguienteAnimacion();
          } else {
            // Si no hay más animaciones en la cola, esperar unos segundos antes de continuar
            setTimeout(function () {
              // Aquí puedes agregar el código que quieras ejecutar después de la animación
              console.log(
                "Terminó la animación. Espera de 2 segundos antes de continuar."
              );
              console.log("--------------------------------------------------");
            }, 2000);
          }
        }
      }, velocidadEscritura);
    }

    // Agregar la animación actual a la cola
    animacionCombateQueue.push(animarTexto);

    // Verificar si es la primera animación en la cola
    if (animacionCombateQueue.length === 1) {
      // Iniciar la animación
      animarTexto();
    }
  }

  // Mostrar nombre del jugador
  jugador = nombreJugador;
  // nombreJugadorContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoCombate(jugador, nombreJugadorContainer);

  // Mostrar nombre del enemigo
  enemigo = nombreEnemigo;
  //nombreEnemigoContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoCombate(enemigo, nombreEnemigoContainer);

  // Mostrar texto de combate
  textcombate = resultado;
  // textoCombateContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoCombate(textcombate, textoCombateContainer);

  setTimeout(callback, tiempoCallback2);
}

//Muestra datos de subida de nivel
function mostrarSubidaEstadisticas(subf, subd, subhp, callback) {
  const fuerzaDiv = document.getElementById("textFuerza");
  const defensaDiv = document.getElementById("textDefensa");
  const vidaDiv = document.getElementById("textVida");

  //las variables si son null cojen 0 como dato base
  subf = subf || 0;
  subd = subd || 0;
  subhp = subhp || 0;

  var subidaFuerza = subf;
  var subidaDefensa = subd;
  var subidaVida = subhp;

  var text1 = " ";
  var text2 = " ";
  var text3 = " ";

  //Funcion interna para colocar el texto
  function mostrarTexto(texto, contenedor) {
    // Función para ejecutar la animación de texto
    function animarTexto() {
      contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor

      var index = 0;
      const intervalo = setInterval(function () {
        const char = texto.charAt(index);

        if (char === "<") {
          // Avanzar hasta el final de la etiqueta
          const finalEtiqueta = texto.indexOf(">", index) + 1;
          contenedor.innerHTML += texto.substring(index, finalEtiqueta);
          index = finalEtiqueta;
        } else {
          contenedor.innerHTML += char;
          index++;
        }

        if (index >= texto.length) {
          clearInterval(intervalo);

          // Verificar si hay más animaciones en la cola
          if (subidaQueue.length > 0) {
            const siguienteAnimacion = subidaQueue.shift();
            siguienteAnimacion();
          }
        }
      }, 1000);
    }

    // Agregar la animación actual a la cola
    subidaQueue.push(animarTexto);

    // Verificar si es la primera animación en la cola
    if (subidaQueue.length === 1) {
      // Iniciar la animación
      animarTexto();
    }
  }

  // Muestrar fuerza
  text1 = subidaFuerza;
  fuerzaDiv.innerHTML = "";
  mostrarTexto("+" + text1, fuerzaDiv);

  // Muestrar defensa
  text2 = subidaDefensa;
  defensaDiv.innerHTML = "";
  mostrarTexto("+" + text2, defensaDiv);

  // Muestrar vida
  text3 = subidaVida;
  vidaDiv.innerHTML = "";
  mostrarTexto("+" + text3, vidaDiv);

  mostrarSubida(); //Muestra los Contenedores de Datos de subida
  setTimeout(callback, tiempoCallback2);
}
