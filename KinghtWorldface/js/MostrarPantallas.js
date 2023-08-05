//Oculta y hace aparecer los textos

function mostrarCombate(callback) {
  const combateDiv = document.getElementById("combate");
  const eventosDiv = document.getElementById("eventos");
  const hogueraDiv = document.getElementById("hoguera");
  const estrellasDiv = document.getElementById("estrellas");
  const estadisticasDiv = document.getElementById("Datos");

  currentIndex = 1; // Al llamar la funcion pone el index en la pantalla que muestra

  combateDiv.style.display = "block";
  eventosDiv.style.display = "none";
  hogueraDiv.style.display = "none";
  estrellasDiv.style.display = "none";
  estadisticasDiv.style.display = "none";

  setTimeout(callback, tiempoCallback); // Llamar al callback para pasar a la siguiente función después de 2 segundos
}

function mostrarEventos(callback) {
  const combateDiv = document.getElementById("combate");
  const eventosDiv = document.getElementById("eventos");
  const hogueraDiv = document.getElementById("hoguera");
  const pocionDiv = document.getElementById("pociones");
  const meandoDiv = document.getElementById("meando");
  const estrellasDiv = document.getElementById("estrellas");
  const estadisticasDiv = document.getElementById("Datos");

  currentIndex = 2; // Al llamar la funcion pone el index en la pantalla que muestra

  combateDiv.style.display = "none";
  eventosDiv.style.display = "block";
  hogueraDiv.style.display = "none";
  pocionDiv.style.display = "none";
  meandoDiv.style.display = "none";
  estrellasDiv.style.display = "none";
  estadisticasDiv.style.display = "none";

  setTimeout(callback, tiempoCallback); // Llamar al callback para pasar a la siguiente función después de 2 segundos
}

function mostrarHoguera(callback) {
  const combateDiv = document.getElementById("combate");
  const eventosDiv = document.getElementById("eventos");
  const hogueraDiv = document.getElementById("hoguera");
  const estrellasDiv = document.getElementById("estrellas");
  const estadisticasDiv = document.getElementById("Datos");

  currentIndex = 3; // Al llamar la funcion pone el index en la pantalla que muestra

  combateDiv.style.display = "none";
  eventosDiv.style.display = "none";
  hogueraDiv.style.display = "block";
  estrellasDiv.style.display = "none";
  estadisticasDiv.style.display = "none";

  setTimeout(callback, tiempoCallback); // Llamar al callback para pasar a la siguiente función después de 2 segundos
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

function mostrarEstadisticas(callback) {
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

  setTimeout(callback, tiempoCallback); // Llamar al callback para pasar a la siguiente función después de 2 segundos
}

function mostrarPocion() {
  const pocionDiv = document.getElementById("pociones");
  const meandoDiv = document.getElementById("meando");

  meandoDiv.style.display = "none";
  pocionDiv.style.display = "block";
}

function mostrarMeando() {
  const pocionDiv = document.getElementById("pociones");
  const meandoDiv = document.getElementById("meando");

  meandoDiv.style.display = "block";
  pocionDiv.style.display = "none";
}
function mostrarPerro() {
  const perroDiv = document.getElementById("perroContainer");
  perroDiv.style.display = "block";
}

function mostrarSevaPerro() {
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

  fuerzaDiv.style.display = "none";
  defensaDiv.style.display = "none";
  vidaDiv.style.display = "none";
}

/* Función para agregar una función a la cola de reproducción
function addToQueue(func) {
  functionQueue.push(func);

  // Si es la primera función en la cola, iniciar la reproducción
  if (functionQueue.length === 1) {
    playNextFunction();
  }
}

// Función para reproducir la siguiente función en la cola
function playNextFunction() {
    if (functionQueue.length >= 1) {
      const nextFunction = functionQueue[0];
  
      setTimeout(function () {
        console.log("LLAMA OTRA FUNCION");
        console.log("--------------------------------------------");
  
        nextFunction(function () {
          // Al terminar la función actual, llamar a la siguiente
          functionQueue.shift(); // Eliminar la función actual de la cola
          playNextFunction(); // Llamar a la siguiente función en la cola
        });
      }, 5000);
    }
  }*/

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

  

  mostrarEventos();
  setTimeout(callback, tiempoCallback);
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
  texto = "Fuistes derrotado por " + enemigo.nombre + ", <br>Te recuperas en la Hoguera";
  textoHogueraContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoHoguera(texto, textoHogueraContainer);

  mostrarHoguera(); // Muestra pantalla de Hoguera
  setTimeout(callback, tiempoCallback);
}

// Muestra el texto de las estadisticas del Jugador
function estadisticasJugador(callback) {
  //Contenedores donde va el texto
  const textoEstadisticaContainer = document.getElementById( "textoEstadisticasJugador");
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

  mostrarEstadisticas();
  setTimeout(callback, tiempoCallback);
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
  nombreJugadorContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoCombate(jugador, nombreJugadorContainer);

  // Mostrar nombre del enemigo
  enemigo = nombreEnemigo;
  nombreEnemigoContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoCombate(enemigo, nombreEnemigoContainer);

  // Mostrar texto de combate
  textcombate = resultado;
  textoCombateContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoCombate(textcombate, textoCombateContainer);

  mostrarCombate();
  setTimeout(callback, tiempoCallback);
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
  
  mostrarTexto("+" + text1, fuerzaDiv);

  // Muestrar defensa
  text2 = subidaDefensa;
  mostrarTexto("+" + text2, defensaDiv);

  // Muestrar vida
  text3 = subidaVida;
  mostrarTexto("+" + text3, vidaDiv, 1000);

  mostrarSubida(); //Muestra los Contenedores de Datos de subida
  setTimeout(callback, tiempoCallback);
}
