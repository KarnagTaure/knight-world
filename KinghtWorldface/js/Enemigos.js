
function obtenerEnemigosSegunNivel(nivelJugador) {
    //Enemigos por defecto
    const enemigosPorDefecto = [
      { nombre: "Borracho", salud: 15, ataque: 5, defensa: 2, exp: 10 },
      { nombre: "Yonky", salud: 25, ataque: 10, defensa: 5, exp: 25 },
      { nombre: "El Jony", salud: 35, ataque: 20, defensa: 10, exp: 35 },
      {
        nombre: "La suegra enfadada",
        salud: 50,
        ataque: 25,
        defensa: 10,
        exp: 50,
      },
    ];
  
    // Enemigos segun el nivel
    const bloquesEnemigos = [
      {
        nivelInicial: 1,
        nivelFinal: 10,
        enemigos: [
          { nombre: "Borracho", ataque: 5, defensa: 2, salud: 10, exp: 15 },
          { nombre: "Yonky", ataque: 7, defensa: 3, salud: 12, exp: 20 },
          { nombre: "Domingero", ataque: 7, defensa: 3, salud: 12, exp: 25 },
          { nombre: "El Jony", salud: 35, ataque: 20, defensa: 10, exp: 35 },
          { nombre: "Un perro Flauta", salud: 35, ataque: 20, defensa: 10, exp: 35, },
          { nombre: "La suegra enfadada", salud: 50, ataque: 25, defensa: 10, exp: 50, },
          // Otros enemigos para el rango de niveles del 1 al 10
        ],
      },
      {
        nivelInicial: 11,
        nivelFinal: 20,
        enemigos: [
          { nombre: "Enemigo ", ataque: 15, defensa: 8, salud: 30, exp: 50 },
          { nombre: "Conejito ", ataque: 18, defensa: 10, salud: 35, exp: 60 },
          { nombre: "Dominguero Frustrado", ataque: 18, defensa: 10, salud: 35, exp: 60, },
          // Otros enemigos para el rango de niveles del 11 al 20
        ],
      },
      {
        nivelInicial: 21,
        nivelFinal: 30,
        enemigos: [
          { nombre: "Enemigo ", ataque: 15, defensa: 8, salud: 30, exp: 50 },
          { nombre: "Conejito ", ataque: 18, defensa: 10, salud: 35, exp: 60 },
          { nombre: "Dominguero Frustrado", ataque: 18, defensa: 10, salud: 35, exp: 60, },
          // Otros enemigos para el rango de niveles del 11 al 20
        ],
      },
      {
        nivelInicial: 31,
        nivelFinal: 50,
        enemigos: [
          { nombre: "Enemigo ", ataque: 15, defensa: 8, salud: 30, exp: 50 },
          { nombre: "Conejito ", ataque: 18, defensa: 10, salud: 35, exp: 60 },
          { nombre: "Dominguero Frustrado", ataque: 18, defensa: 10, salud: 35, exp: 60, },
          // Otros enemigos para el rango de niveles del 11 al 20
        ],
      },
      {
        nivelInicial: 11,
        nivelFinal: 20,
        enemigos: [
          { nombre: "Enemigo ", ataque: 15, defensa: 8, salud: 30, exp: 50 },
          { nombre: "Conejito ", ataque: 18, defensa: 10, salud: 35, exp: 60 },
          { nombre: "Dominguero Frustrado", ataque: 18, defensa: 10, salud: 35, exp: 60, },
          // Otros enemigos para el rango de niveles del 11 al 20
        ],
      },
      {
        nivelInicial: 11,
        nivelFinal: 20,
        enemigos: [
          { nombre: "Enemigo ", ataque: 15, defensa: 8, salud: 30, exp: 50 },
          { nombre: "Conejito ", ataque: 18, defensa: 10, salud: 35, exp: 60 },
          { nombre: "Dominguero Frustrado", ataque: 18, defensa: 10, salud: 35, exp: 60, },
          // Otros enemigos para el rango de niveles del 11 al 20
        ],
      },
      // Otros bloques de enemigos para diferentes rangos de niveles
    ];
  
    // Buscar el bloque de enemigos correspondiente al nivel del jugador
    var bloqueEnemigos;
    for (let i = 0; i < bloquesEnemigos.length; i++) {
      if (
        nivelJugador >= bloquesEnemigos[i].nivelInicial &&
        nivelJugador <= bloquesEnemigos[i].nivelFinal
      ) {
        bloqueEnemigos = bloquesEnemigos[i];
        break;
      }
    }
  
    if (bloqueEnemigos) {
      // Devolver los enemigos del bloque correspondiente al nivel del jugador
      return bloqueEnemigos.enemigos;
    } else {
      // Si no hay un bloque específico para el nivel del jugador,
      // puedes devolver enemigos de un bloque predeterminado o manejar la situación según tu lógica.
      // Por ejemplo:
      return enemigosPorDefecto; // Supongamos que "enemigosPorDefecto" es una lista de enemigos para niveles bajos.
    }
  }