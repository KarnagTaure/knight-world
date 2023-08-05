
let  paisaje;
var biomaActual;

var biomas = {
    Llanura: {
      paisaje: 'images/PaisajeLlanura.gif',
      
      
      // Otros atributos del bioma llanura
    },
    Desierto: {
      paisaje: 'images/PaisajeDesierto.gif',
      ataqueBajo: 3,
      
      // Otros atributos del bioma desierto
    },
    Bosque: {
      paisaje: 'images/PaisajeBosque.gif',
      pasosAdicionales: 100,
      
      // Otros atributos del bioma bosque
    },
    Montana: {
      paisaje: 'images/PaisajeMontana.gif',
      pasosAdicionales: 200,
      
      
      // Otros atributos del bioma montaña
    }
  };
  
  function cambiarPaisajeBioma() {
    
    //biomaActual = getNombreBioma(CordenadasY(), CordenadasX());
     paisaje = biomas[getNombreBioma(CordenadasY(), CordenadasX())].paisaje;

    
    
    return paisaje;
  }
  
  