let x = 5; //Columna
let y = 3; // Fila

//Definir una cola para las funciones de reproducción de Texto y gif

const animacionEstadisticaQueue = [];// Array para almacenar el texto de Estadisticas
const animacionHogueraQueue = [];// Array para almacenar el texto de Hoguera
const animacionCombateQueue = [];// Array para almacenar el texto de Combate
const animacionEventoQueue = [];// Array para almacenar el texto de Eventos
const subidaQueue = [];// Array para almacenar el texto de Subida de Nivel
const gifQueue = [];// Array para almacenar los gif de la zona de Datos
const functionQueue = [];// Array para almacenar las funciones en la cola

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
var tiempoCallback = 5000;
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
  pasosTotales = stepActual;
  // Comprueva que no haya descuadre negativo con los pasos
  if (pasosTotales <= pasosAyer) {
    pasosAyer = pasosTotales;
  } else {
    ubicacionAnterior = ubicacionActual;
    pasosDiarios = pasosTotales - pasosAyer;
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

//Funcion  para subir estadisticas de nivel

function subirNivel() {
  if (nivel <= 99) {
    nivel++;
    mostrarSubida(); //Muestra los Contenedores de Datos de subida

    // Aumentar las estadísticas del jugador según el nivel actual
    jugadorSaludMax += subidaVida;
    jugadorAtaque += subidaFuerza;
    jugadorDefensa += subidaDefensa;

    //Pone la salud al Maximo
    jugadorSaludActual = jugadorSaludMax;
    EXPNvL = calcularExperienciaNivel(nivel); //Actualiza exp max
    expJugador = expJugadorTotal - expJugadorUsada;

    // Actualiza datos en pantalla
    guardarDatos();
    updateProgressBar();
    updateVidaBar();
    estadisticasJugador(); // Actualiza datos de estadisticas
    addToQueue(mostrarEstadisticas);
   // mostrarEstadisticas(); //muestra pantalla de estadisticas

    mostrarSubidaEstadisticas(subidaFuerza, subidaDefensa, subidaVida);

    setTimeout(esconderSubida, 30000);
  }
}

function mostrarSubidaEstadisticas(subf, subd, subhp) {
  const fuerzaDiv = document.getElementById("textFuerza");
  const defensaDiv = document.getElementById("textDefensa");
  const vidaDiv = document.getElementById("textVida");

  //las variables si son null cojen 0 como dato base
  subf = subf || 0;
  subd = subd || 0;
  subhp = subhp || 0;

  var fuerza = subf;
  var defensa = subd;
  var vida = subhp;

  var text1 = " ";
  var text2 = " ";
  var text3 = " ";

  //Funcion interna para colocar el texto
  function mostrarTexto(texto, contenedor) {
    // Función para ejecutar la animación de texto
    function animarTexto(callback) {
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
      setTimeout(callback, tiempoCallback);
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
  console.log(text1);
  mostrarTexto("+" + text1, fuerzaDiv);

  // Muestrar defensa
  text2 = subidaDefensa;
  mostrarTexto("+" + text2, defensaDiv);

  // Muestrar vida
  text3 = subidaVida;
  mostrarTexto("+" + text3, vidaDiv, 1000);
}

//Calcular la experiencia segun el Nivel

function calcularExperienciaNivel(NvL) {
  // Incremento porcentual para cada nivel
  const incrementoPorcentual = 0.1;
  console.log("Calcula EXP");
  console.log("------------------------------");
  if (NvL === 1) {
    return 100; // Nivel 1 no necesita experiencia
  } else {
    // Calcula la experiencia necesaria para el nivel actual
    console.log("Calcula la experiencia necesaria para el nivel actual");
    console.log("------------------------------");
    const experienciaNivelAnterior = calcularExperienciaNivel(NvL - 1);
    const incrementoExperiencia =
      experienciaNivelAnterior * incrementoPorcentual;
    return Math.round(experienciaNivelAnterior + incrementoExperiencia);
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
        addToQueue(mostrarCombate);
        //mostrarCombate(); // Muestra la pantalla de combate
        combate(); // Funcion para Combate

        break;

      case "eventos":
        console.log("Eligue un evento perruno");
        console.log("------------------------------");
        addToQueue(mostrarEventos);
       // mostrarEventos(); //llama para que se vea la pantalla eventos
        eventos();

        break;
      case "pocion":
        pociones += 1;
        console.log("pocion obtenida");
        console.log("------------------------------");
        addToQueue(mostrarEventos);
       // mostrarEventos(); //llama para que se vea la pantalla eventos
        mostrarEvento("Pocion", "Pocion obtenida");

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
      addToQueue(mostrarEventos);
      //mostrarEventos(); //llama para que se vea la pantalla eventos
      mostrarEvento("Meando", " ! Ves a un perro mear ¡ ");

      break;

    case "EncuentraPerro":
      if (perro === true) {
        console.log("el perro se canso y se fue");
        console.log("------------------------------");
        addToQueue(mostrarEventos);
        //mostrarEventos(); //llama para que se vea la pantalla eventos
        mostrarEvento("Sevaperro", "El perro se canso y se fue");
        perro = false;
      } else {
        addToQueue(mostrarEventos);
        //mostrarEventos(); //llama para que se vea la pantalla eventos
        mostrarEvento(
          "EncuentrasPerro",
          "Un perro se encariña de ti<br> ! Y te sigue ¡ "
        );
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
  } else if (randomNumber < 0.9) {
    /*return 'Perro'; // Opción 2 con 20% de probabilidad
	  } else {*/
    return "EncuentraPerro"; // Opción 3 con 10% de probabilidad
  }
}

function combate() {
  agregarGifEnCola(caballeroLuchaPath, gifCaballeroContainer); // Muestra el gif Luchando

  const enemigos = obtenerEnemigosSegunNivel(nivel); // Elige bloque de enemigo dependiendo del Nivel
  enemigo = enemigos[Math.floor(Math.random() * enemigos.length)]; //Seleccionar un enemigo aleatorio para el combate
  var turno = 0; // Variable para alternar entre el jugador y el enemigo

  // Mostrar información sobre el enemigo seleccionado
  console.log("¡Un " + enemigo.nombre + " salvaje aparece!");
  console.log("Salud del enemigo: " + enemigo.salud);
  console.log("Ataque del enemigo: " + enemigo.ataque);
  console.log("Defensa del enemigo: " + enemigo.defensa);
  console.log("------------------------------");

  // Bucle principal del combate
  while (jugadorSaludActual > 0 && enemigo.salud > 0) {
    turno++;

    if (turno % 2 === 1) {
      // Turno del jugador
      console.log("Turno del jugador");

      // Realizar acciones del jugador, como elegir un ataque o usar una habilidad especial
      //Si tiene pociones y menos de 10 de vida usa una pocion
      if (jugadorSaludActual < 20) {
        if (pociones > 0) {
          pociones--;
          jugadorSaludActual += 20;
          console.log("Usas una pocion! Recuperas 20 puntos de vida");
          console.log("------------------------------");
          mostrarEvento("Pocion", "Usas una pocion<br> Recuperas 20 de vida");
        }
      } else {
        // Calcular el daño infligido al enemigo
        var dañoInfligido = calcularDaño(jugadorAtaque, enemigo.defensa);
        enemigo.salud -= dañoInfligido;
        updateVidaBar();
        console.log(
          "Has infligido " +
            dañoInfligido +
            " puntos de daño al " +
            enemigo.nombre +
            "."
        );
      }
    } else {
      // Turno del enemigo
      console.log("Turno del enemigo");

      // Realizar acciones del enemigo, como elegir un ataque

      // Calcular el daño infligido al jugador
      var dañoInfligido = calcularDaño(enemigo.ataque, jugadorDefensa);
      jugadorSaludActual -= dañoInfligido;

      console.log(
        "El " +
          enemigo.nombre +
          " inflige " +
          dañoInfligido +
          " puntos de daño."
      );
    }

    // Mostrar las estadísticas actualizadas después de cada turno
    console.log("Salud del jugador: " + jugadorSaludActual);
    console.log("Salud del " + enemigo.nombre + ": " + enemigo.salud);
    console.log("------------------------------");
  }

  // Determinar el resultado del combate

  //Jugador Pierde
  if (jugadorSaludActual <= 0) {
    pierde++;

    console.log(
      "¡Has perdido el combate contra el " +
        enemigo.nombre +
        "! huyes a un lugar seguro!"
    );
    console.log("------------------------------");

    // Coloca texto en pantalla
    combateTexto(
      "Jugador",
      enemigo.nombre,
      "¡ Has perdido el combate ! <br>Pierdes 10 Puntos de Exp"
    );

    // Reproducir GIF de caballeroMuerte si el jugador pierde
    agregarGifEnCola(caballeroMuertePath, gifCaballeroContainer);

    //Comprueva si tiene EXP para quitar
    if (expJugador > 0) {
      expJugador -= 10;
      console.log("Pierdes 10 Puntos de Exp");
      console.log("------------------------------");

      //si queda en negativo la pone en 0
      if (expJugador < 0) {
        expJugador = 0;
      }
    }

    // Recupera la salud Max
    recuperarseHoguera();

    // Jugador Gana
  } else {
    gana++;
    // Suma la EXP del enemigo
    expJugadorTotal += enemigo.exp;
    expJugador = expJugadorTotal - expJugadorUsada;

    console.log(
      "¡Has derrotado al " +
        enemigo.nombre +
        "! y ganastes " +
        enemigo.exp +
        " de XP Total de EXP " +
        expJugadorTotal
    );
    console.log("------------------------------");

    //Imprime en pantala los resultados
    combateTexto(
      "Jugador",
      enemigo.nombre,
      "¡ Has derrotado al " +
        enemigo.nombre +
        "!  <br>Ganastes " +
        enemigo.exp +
        " de EXP"
    );

    // Actualiza la Datos en Pantalla
    updateProgressBar();
    updateVidaBar();

    // Se comprueva que sube de nivel
    if (expJugador >= EXPNvL) {
      expJugadorUsada += EXPNvL;
      subirNivel();

      console.log("¡Has subido al nivel " + nivel + "!");
      console.log("Tus estadísticas se han mejorado:");
      console.log("Salud: " + jugadorSaludMax);
      console.log("Ataque: " + jugadorAtaque);
      console.log("Defensa: " + jugadorDefensa);
      console.log("Siguiente NvL: " + EXPNvL);
      console.log("------------------------------");
    } else {
      estadisticasJugador(); // Si no sube de Nivel  se actualiza estadisticas
    }
  }
}

// Texto En combate

function combateTexto(nombreJugador, nombreEnemigo, resultado) {
  const nombreJugadorContainer = document.getElementById("textNombreJugador");
  const nombreEnemigoContainer = document.getElementById("textNombreEnemigo");
  const textoCombateContainer = document.getElementById("textoCombate");

  

  var jugador = "";
  var enemigo = "";
  var textcombate = "";

  function mostrarTextoCombate(texto, contenedor) {
    // Función para ejecutar la animación de texto
    function animarTexto(callback) {
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
        setTimeout(callback, tiempoCallback);
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

  
}

//Texto para los Eventos
function mostrarEvento(tipoEvento, textoEvento) {
  const textoEventosContainer = document.getElementById("textoEventos");

  // Mostrar el evento en el contenedor
  function mostrarTextoEvento(texto, contenedor) {
    // Función para ejecutar la animación de texto
    function animarTexto(callback) {
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
        setTimeout(callback, tiempoCallback);
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

  // Ejecutar la función correspondiente según el tipo de evento

  switch (tipoEvento) {
    case "Pocion":
      mostrarPocion();

      break;

    case "Meando":
      mostrarMeando();

      break;

    case "EncuentrasPerro":
      mostrarPerro();

      break;

    case "Sevaperro":
      mostrarSevaPerro();

      break;
  }
}

// Muestra la pantalla de hoguera y actualiza texto

function recuperarseHoguera() {
  const textoHogueraContainer = document.getElementById("textoHoguera");
  var texto = " ";

 

  console.log("Descansas en la Hoguera");
  console.log("------------------------------");
  jugadorSaludActual = jugadorSaludMax;

  // Actualiza datos en pantalla
  updateVidaBar();
  updateProgressBar();
  guardarDatos();
  estadisticasJugador();

  function mostrarTextoHoguera(texto, contenedor) {
    // Función para ejecutar la animación de texto
    function animarTexto(callback) {
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
        setTimeout(callback, tiempoCallback);
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
  texto ="Fuistes derrotado por " + enemigo.nombre +", <br>Te recuperas en la Hoguera";
  textoHogueraContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoHoguera(texto, textoHogueraContainer);

  addToQueue(mostrarHoguera);
  //mostrarHoguera(); // Muestra pantalla de Hoguera
}

// Muestra el texto de las estadisticas del Jugador

function estadisticasJugador() {
  //Contenedores donde va el texto
  const textoEstadisticaContainer = document.getElementById("textoEstadisticasJugador");
  const textoNvlContainer = document.getElementById("textNvlJugador");

  var texto = " ";
  var Nvl = " ";

  function mostrarTextoEstadistica(texto, contenedor) {
    // Función para ejecutar la animación de texto
    contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor
    function animarTexto(callback) {
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
      setTimeout(callback, tiempoCallback);
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
  texto ="Fuerza : " +jugadorAtaque + "<br>Defensa : " + jugadorDefensa + "<br>Vida Max : " + jugadorSaludMax + "<br>ExpTotal : " + expJugador + "/" + EXPNvL;
  textoEstadisticaContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoEstadistica(texto, textoEstadisticaContainer);
}

// Función para agregar una función a la cola de reproducción
function addToQueue(func) {
  functionQueue.push(func);

  // Si es la primera función en la cola, iniciar la reproducción
  if (functionQueue.length === 1) {
    playNextFunction();
  }
}

// Función para reproducir la siguiente función en la cola
function playNextFunction() {
  if (functionQueue.length > 0) {
    const nextFunction = functionQueue[0];
    nextFunction(function () {
      // Al terminar la función actual, llamar a la siguiente
      functionQueue.shift(); // Eliminar la función actual de la cola
      playNextFunction(); // Llamar a la siguiente función en la cola
    });
  }
}

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

// Función para calcular el daño teniendo en cuenta la defensa del oponente

function calcularDaño(ataque, defensa, arma) {
  const danoAleatorio = Math.round(Math.random() * (20 - 5 + 1) + 5); // Número aleatorio entre 5 y 20
  const tiradaArmadura = Math.round(Math.random() * (20 - 1 + 1) + 1); // Número aleatorio entre 1 y 20
  const danoArma = arma || 0; // Asignar 0 a danoArma si arma es null
  const danoFinal = Math.round(
    tiradaArmadura + ataque * 0.2 > 10 + defensa * 0.2
      ? danoAleatorio + danoArma
      : 0
  ); // Aplicar lógica de daño

  return danoFinal + Math.round(ataque * 0.2);
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

    pasosDiarios=0// Actualizacion a 0 al pasar de dia
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
