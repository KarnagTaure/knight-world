
let  paisaje;
var biomaActual;

var biomas = {
    Llanura: {
      paisaje: 'images/Zonas/Gif/PaisajeLlanura.gif',
      
      
      // Otros atributos del bioma llanura
    },
    Desierto: {
      paisaje: 'images/Zonas/Gif/PaisajeDesierto.gif',
      ataqueBajo: 3,
      
      // Otros atributos del bioma desierto
    },
    Bosque: {
      paisaje: 'images/Zonas/Gif/PaisajeBosque.gif',
      pasosAdicionales: 100,
      
      // Otros atributos del bioma bosque
    },
    Montana: {
      paisaje: 'images/Zonas/Gif/PaisajeMontana.gif',
      pasosAdicionales: 200,
      
      
      // Otros atributos del bioma montaña
    }
  };
  
  function cambiarPaisajeBioma() {
    
    //biomaActual = getNombreBioma(CordenadasY(), CordenadasX());
     paisaje = biomas[getNombreBioma(CordenadasY(), CordenadasX())].paisaje;

    
    
    return paisaje;
  }
  
  