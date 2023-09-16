

//Funcion  para subir estadisticas de nivel
function subirNivel() {
  if (nivel <= 99) {
    nivel++;
    

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
    mostrarPasos();

   mostrarPantallaEstadisticas();
    
    

    
  }
}

//Calcular la experiencia segun el Nivel
function calcularExperienciaNivel(NvL) {
  // Incremento porcentual para cada nivel
  const incrementoPorcentual = 0.1;
  //console.log("Calcula EXP");
  //console.log("------------------------------");
  if (NvL === 1) {
    return 100; // Nivel 1 no necesita experiencia
  } else {
    // Calcula la experiencia necesaria para el nivel actual
    //console.log("Calcula la experiencia necesaria para el nivel actual");
    //console.log("------------------------------");
    const experienciaNivelAnterior = calcularExperienciaNivel(NvL - 1);
    const incrementoExperiencia =
      experienciaNivelAnterior * incrementoPorcentual;
    return Math.round(experienciaNivelAnterior + incrementoExperiencia);
  }
}
// Funcion para los combates aleatorios
function combate() {
  

  const enemigos = obtenerEnemigosSegunNivel(nivel); // Elige bloque de enemigo dependiendo del Nivel
  enemigo = enemigos[Math.floor(Math.random() * enemigos.length)]; //Seleccionar un enemigo aleatorio para el combate
  var turno = 0; // Variable para alternar entre el jugador y el enemigo

  // Mostrar información sobre el enemigo seleccionado
  //console.log("¡Un " + enemigo.nombre + " salvaje aparece!");
  //console.log("Salud del enemigo: " + enemigo.salud);
  //console.log("------------------------------");

  // Bucle principal del combate
  while (jugadorSaludActual > 0 && enemigo.salud > 0) {
    turno++;

    if (turno % 2 === 1) {
      // Turno del jugador
      //console.log("Turno del jugador");

      // Realizar acciones del jugador, como elegir un ataque o usar una habilidad especial
      //Si tiene pociones y menos de 10 de vida usa una pocion
      if (jugadorSaludActual < 20) {
        if(pociones>0){
          usarPocion();
        }
        
      } else {
        // Calcular el daño infligido al enemigo
        var dañoInfligido = calcularDaño(jugadorAtaque, enemigo.defensa);
        enemigo.salud -= dañoInfligido;
        updateVidaBar();
      }
    } else {
      // Turno del enemigo
      //console.log("Turno del enemigo");

      // Realizar acciones del enemigo, como elegir un ataque

      // Calcular el daño infligido al jugador
      var dañoInfligido = calcularDaño(enemigo.ataque, jugadorDefensa);
      jugadorSaludActual -= dañoInfligido;
    }

    // Mostrar las estadísticas actualizadas después de cada turno
    //console.log("Salud del jugador: " + jugadorSaludActual);
    //console.log("Salud del " + enemigo.nombre + ": " + enemigo.salud);
    //console.log("------------------------------");
  }

  // Determinar el resultado del combate

  //Jugador Pierde
  if (jugadorSaludActual <= 0) {
    pierde++;

    //console.log(  "¡Has perdido el combate contra el " + enemigo.nombre +"! huyes a un lugar seguro!");
    //console.log("------------------------------");



    //Comprueva si tiene EXP para quitar
    if (expJugador > 0) {
      expJugador -= 10;
      //console.log("Pierdes 10 Puntos de Exp");
      //console.log("------------------------------");

      //si queda en negativo la pone en 0
      if (expJugador < 0) {
        expJugador = 0;
      }
    }

    // Recupera la salud Max
    jugadorSaludActual = jugadorSaludMax;
   mostrarPantallaHoguera();
   
    

    // Jugador Gana
  } else {
    gana++;
    // Suma la EXP del enemigo
    expJugadorTotal += enemigo.exp;
    expJugador = expJugadorTotal - expJugadorUsada;

    //console.log("¡Has derrotado al " +enemigo.nombre +"! y ganastes " +enemigo.exp +" de XP Total de EXP " +expJugadorTotal);
    //console.log("------------------------------");

    //Imprime en pantala Victoria

    
      mostrarPantallaCombate(
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

      //console.log("¡Has subido al nivel " + nivel + "!");
      //console.log("Tus estadísticas se han mejorado:");
      //console.log("Salud: " + jugadorSaludMax);
      //console.log("Ataque: " + jugadorAtaque);
      //console.log("Defensa: " + jugadorDefensa);
      //console.log("Siguiente NvL: " + EXPNvL);
      //console.log("------------------------------");
    } else {
      //addToFuncion(mostrarPantallaEstadisticas);
      textoEstadisticaJugador();
    }
  }

}
// Funcion para usar pociones
function usarPocion(){
  if (pociones > 0 && jugadorSaludActual<jugadorSaludMax) {
    pociones--;
    jugadorSaludActual += 20;


    if (jugadorSaludActual>jugadorSaludMax){

      jugadorSaludActual= jugadorSaludMax;
      updateVidaBar();
    }
    //console.log("Usas una pocion! Recuperas 20 puntos de vida");
    //console.log("------------------------------");

    addToFuncion(function(){
      mostrarPantallaEventos("UsasPocion", "Usas una pocion <br> Recuperas 20 de vida")

    });
    updateVidaBar();
  }else if (jugadorSaludActual>=jugadorSaludMax && pociones > 0){

    addToFuncion(function(){
      mostrarPantallaEventos("PocionMax", "Ya tienes la salud<br> al maximo")
    });
  
  
  }else{
    addToFuncion(function(){
      mostrarPantallaEventos("PocionVacia", "No te quedan <br> mas pociones")
    });
    

  }
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
