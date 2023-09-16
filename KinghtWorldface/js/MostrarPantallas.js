



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
  agregarGifEnCola(caballeroLuchaPath, gifCaballeroContainer); // Muestra el gif Luchando
  //console.log("PANTALLA COMBATE");
  //console.log("--------------------------------------------------");

  currentIndex = 1; // Al llamar la funcion pone el index en la pantalla que muestra

  combateDiv.style.display = "block";
  eventosDiv.style.display = "none";
  hogueraDiv.style.display = "none";
  estrellasDiv.style.display = "none";
  estadisticasDiv.style.display = "none";

  async function mostrarTextoCombate(nombreJugador, nombreEnemigo, resultado) {
    // Función para ejecutar la animación de texto
    function animarTexto(texto, contenedor) {
      return new Promise((resolve) => {
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
            resolve(); // Resuelve la promesa cuando se completa la animación
          }
        }, velocidadEscritura);
      });
    }

    //console.log("Mostar texto");
    //console.log("--------------------------------------------------");

    // Mostrar nombre del jugador
    jugador = nombreJugador;
    nombreJugadorContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
    await animarTexto(jugador, nombreJugadorContainer);
    //console.log("TEXTO 1");
    //console.log("--------------------------------------------------");

    // Mostrar nombre del enemigo
    enemigo = nombreEnemigo;
    nombreEnemigoContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
    await animarTexto(enemigo, nombreEnemigoContainer);
    //console.log("TEXTO 2");
    //console.log("--------------------------------------------------");

    // Mostrar texto de combate
    textcombate = resultado;
    textoCombateContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
    await animarTexto(textcombate, textoCombateContainer);
    //console.log("TEXTO 3");
    //console.log("--------------------------------------------------");
  }

  mostrarTextoCombate(nombreJugador, nombreEnemigo, resultado);
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

  if(tipoEvento=== "Pocion" ){
    mostrarGifPocion();
    agregarGifEnCola(pocionLlenaPath, pocionDiv);
    //console.log("Pocion");
        //console.log("------------------------------");

  }else if(tipoEvento ==="PocionMax" ){
    mostrarGifPocion();
    agregarGifEnCola(pocionLlenaPath, pocionDiv);
    //console.log("pocion al Max");
        //console.log("------------------------------");

  }else if(tipoEvento ==="PocionVacia" ){
    mostrarGifPocion();
    agregarGifEnCola(pocionVaciaPath, pocionDiv);
    //console.log("Pocion vacia");
        //console.log("------------------------------");

  }else if(tipoEvento ==="UsasPocion" ){
    mostrarGifPocion();
    agregarGifEnCola(pocionVaciandosePath, pocionDiv);
    //console.log("usas Pocion");
        //console.log("------------------------------");


  }else if(tipoEvento ==="Meando" ){
    mostrarGifMeando();

  }else if(tipoEvento ==="Sevaperro" ){
    perro = false;
    mostrarGifMeando();
    mostrarSevaGifPerro();
    

  }else {
    perro = true;
    mostrarGiFPerro();
    mostrarGifMeando();

  }

  // Mostrar el evento en el contenedor
  async function mostrarTextoEvento(textoEvento, textoEventosContainer) {
    // Función para ejecutar la animación de texto en eventos
    function animarTextoEvento(texto, contenedor) {
      return new Promise((resolve) => {
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
            resolve(); // Resuelve la promesa cuando se completa la animación
          }
        }, velocidadEscritura);
      });
    }

    //console.log;
    //console.log("Mostrar evento");
    //console.log("--------------------------------------------------");

    // Muestra el texto de Evento
    textoEventosContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
    await animarTextoEvento(textoEvento, textoEventosContainer);
    //console.log("TEXTO EVENTO");
    //console.log("--------------------------------------------------");
  }

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

  agregarGifEnCola(caballeroMuertePath, gifCaballeroContainer);// Reproducir GIF de caballeroMuerte si el jugador pierde

  //console.log("PANTALLA HOGUERA");
  //console.log("------------------------------");

  async function mostrarTextoHoguera(texto, textoHogueraContainer) {
    // Función para ejecutar la animación de texto en la hoguera
    function animarTextoHoguera(texto, contenedor) {
      return new Promise((resolve) => {
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
            resolve(); // Resuelve la promesa cuando se completa la animación
          }
        }, velocidadEscritura);
      });
    }
    //console.log("Mostrar texto de la hoguera");
    //console.log("--------------------------------------------------");

    // Muestra el texto de la hoguera
    textoHogueraContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
    await animarTextoHoguera(texto, textoHogueraContainer);
    //console.log("TEXTO HOGUERA");
    //console.log("--------------------------------------------------");
  }
  mostrarTextoHoguera(
    "Pierdes 10 Puntos de Exp contra " +
      enemigo.nombre +
      ", <br>Te recuperas en la Hoguera",
    textoHogueraContainer
  );
}

async function mostrarPantallaEstadisticas() {
  const combateDiv = document.getElementById("combate");
  const eventosDiv = document.getElementById("eventos");
  const hogueraDiv = document.getElementById("hoguera");
  const estrellasDiv = document.getElementById("estrellas");
  const estadisticasDiv = document.getElementById("Datos");
  const textoEstadisticaContainer = document.getElementById("textoEstadisticasJugador");
  const textoNvlContainer = document.getElementById("textNvlJugador");

  var texto = " ";
  var Nvl = " ";
  currentIndex = 4; // Al llamar la funcion pone el index en la pantalla que muestra

  combateDiv.style.display = "none";
  eventosDiv.style.display = "none";
  hogueraDiv.style.display = "none";
  estrellasDiv.style.display = "none";
  estadisticasDiv.style.display = "block";

  async function mostrarTextoEstadistica(texto, contenedor) {
    // Función para ejecutar la animación de texto en la estadística
    function animarTextoEstadistica(texto, contenedor) {
      return new Promise((resolve) => {
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
            resolve(); // Resuelve la promesa cuando se completa la animación
          }
        }, velocidadEscritura);
      });
    }

    //console.log("Mostrar texto de estadística");
    //console.log("--------------------------------------------------");

    // Muestra el texto de la estadística
    contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor
    await animarTextoEstadistica(texto, contenedor);
    //console.log("TEXTO ESTADISTICA");
    //console.log("--------------------------------------------------");
  }
  
  Nvl = "Subes a <br> NvL " + nivel;
  textoNvlContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoEstadistica(Nvl, textoNvlContainer);
  
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
  mostrarSubidaEstadisticas(subidaFuerza, subidaDefensa, subidaVida);

}


// Muestra el texto de las estadisticas del Jugador
function textoEstadisticaJugador() {
  //Contenedores donde va el texto
  const textoEstadisticaContainer = document.getElementById(
    "textoEstadisticasJugador"
  );
  const textoNvlContainer = document.getElementById("textNvlJugador");

  var texto = " ";
  var Nvl = " ";

  async function mostrarTextoEstadistica(texto, contenedor) {
    // Función para ejecutar la animación de texto en la estadística
    function animarTextoEstadistica(texto, contenedor) {
      return new Promise((resolve) => {
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
            resolve(); // Resuelve la promesa cuando se completa la animación
          }
        }, velocidadEscritura);
      });
    }

    //console.log("Mostrar texto de estadística");
    //console.log("--------------------------------------------------");

    // Muestra el texto de la estadística
    contenedor.innerHTML = ""; // Borra el contenido anterior del contenedor
    await animarTextoEstadistica(texto, contenedor);
    //console.log("TEXTO ESTADISTICA");
    //console.log("--------------------------------------------------");
  }Nvl = "NvL " + nivel;
  textoNvlContainer.innerHTML = ""; // Borra el contenido anterior del contenedor
  mostrarTextoEstadistica(Nvl, textoNvlContainer);
  
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
  
}

//Muestra la subida de estadisticas
async function mostrarSubidaEstadisticas(subf, subd, subhp, callback) {
  const fuerzaDiv = document.getElementById("textFuerza");
  const defensaDiv = document.getElementById("textDefensa");
  const vidaDiv = document.getElementById("textVida");

  // Las variables si son null cogen 0 como dato base
  subf = subf || 0;
  subd = subd || 0;
  subhp = subhp || 0;

  var subidaFuerza = subf;
  var subidaDefensa = subd;
  var subidaVida = subhp;

  var text1 = " ";
  var text2 = " ";
  var text3 = " ";

  async function mostrarTexto(texto, contenedor) {
    return new Promise((resolve) => {
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
            resolve(); // Resuelve la promesa cuando se completa la animación
          }
        }, 500);
      }

      // Agregar la animación actual a la cola
      subidaQueue.push(async function () {
        await animarTexto();
        // Verificar si hay más animaciones en la cola
        if (subidaQueue.length > 0) {
          const siguienteAnimacion = subidaQueue.shift();
          await siguienteAnimacion();
        }
        resolve(); // Resuelve la promesa cuando se completa la animación
      });

      // Verificar si es la primera animación en la cola
      if (subidaQueue.length === 1) {
        // Iniciar la animación
        const siguienteAnimacion = subidaQueue.shift();
        siguienteAnimacion();
      }
    });
  }

  // Muestrar fuerza
  text1 = subidaFuerza;
  fuerzaDiv.innerHTML = "";
  await mostrarTexto("+" + text1, fuerzaDiv);

  // Muestrar defensa
  text2 = subidaDefensa;
  defensaDiv.innerHTML = "";
  await mostrarTexto("+" + text2, defensaDiv);

  // Muestrar vida
  text3 = subidaVida;
  vidaDiv.innerHTML = "";
  await mostrarTexto("+" + text3, vidaDiv);

  mostrarSubida(); // Muestra los Contenedores de Datos de subida

  setTimeout(function(){
    fuerzaDiv.innerHTML = "";
    defensaDiv.innerHTML = "";
    vidaDiv.innerHTML = "";
  }, 3500)
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

  //console.log("METO FUNCION " + functionArray.length);
  //console.log("--------------------------------------------------");

  // Si es la primera función en la cola, iniciar la reproducción
  if (functionArray.length === 1) {
    //console.log("LE DOY PLAY");
    //console.log("--------------------------------------------------");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await playNextFunction();
  }
}

// Función para reproducir la siguiente función en la cola
async function playNextFunction() {
  if (functionArray.length >= 1) {
    const nextFunction = functionArray.shift();

    //console.log("LLAMA NEXT " + functionArray.length);
    //console.log("--------------------------------------------");

    nextFunction();

    //console.log("LLAMA OTRA FUNCION");
    //console.log("--------------------------------------------");

    await new Promise((resolve) => setTimeout(resolve, 5000));
    await playNextFunction(); // Llamar a la siguiente función en la cola
  }
}
