
var bioma;

var zonas = [];

function mostrarMapa(){
//let biomas = [];
//Creo el contenido del arrary de forma aleatoria
for (let i = 0; i < 6; i++) {
    zonas[i] = [];
    for (let j = 0; j < 10; j++) {
        const tipoBioma = generarBiomaAleatorio();
        zonas[i][j] = tipoBioma;
    }
}

const mapContainer = document.getElementById('mapContainer');

//genera las imagenes en orden en la pantalla
for (let j = 0; j < zonas.length; j++) {
    for (let i = 0; i < zonas[j].length; i++) {
        bioma = zonas[j][i];
        
       // //console.log(zonas[j][i]+' ' );

        const biomaElement = document.createElement('div');//creo un div en html para mostrar en pantalla

        biomaElement.className = 'bioma ' + getBiomaClassName(bioma);//crea el atributo clase al div con el nombre del bioma
        biomaElement.classList.add('gif-overlay'); // Agrega la clase gif-overlay al contenedor
        mapContainer.appendChild(biomaElement);//muestra el dibujo del bioma
    }
   ////console.log('----------------');
}
}


//Genera el array de Biomas para el mapa
function generarBiomaAleatorio() {
    const tiposBiomas = ["Llanura", "Desierto", "Bosque", "Montana"];
    const indiceAleatorio = Math.floor(Math.random() * tiposBiomas.length);
    return tiposBiomas[indiceAleatorio];
}

function getBiomaClassName(bioma) {
    return 'bioma-' + bioma.toLowerCase();
}

//Muestra la imagen del paisaje en el que se esta
function paisajeFondo() {
    const paisajeContainer = document.getElementById('paisajeContainer');
  
    const paisajeImage = document.createElement('img');
    paisajeImage.src = cambiarPaisajeBioma();
    paisajeImage.className = 'paisajeOverlay paisajeSize';
  
    paisajeContainer.appendChild(paisajeImage);
    cambiarPaisajeBioma();
  }

// Dice la zona en la que se encuentra sele coloca  -1 porque el array va de 0 al numero total siendo 0 el 1
function getNombreBioma(x, y){
    return zonas[x-1][y-1];
}

