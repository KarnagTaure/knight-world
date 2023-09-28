let stepTotal = 0;
let stepActual = 0;

(function () {
  var timerUpdateDate = 0,
    flagConsole = false,
    flagDigital = false,
    battery =
      navigator.battery || navigator.webkitBattery || navigator.mozBattery,
    ARR_COLOR = ["red", "orange", "yellow", "green", "blue"],
    arrDay = ["Dom", "Lun", "Mart", "Mie", "Jue", "Vier", "Sab"],
    arrMonth = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    interval;

  /**
   * Updates the date and sets refresh callback on the next day.
   * @private
   * @param {number} prevDay - date of the previous day
   */
  function updateDate(prevDay) {
    var datetime = tizen.time.getCurrentDateTime(),
      nextInterval,
      strDay = document.getElementById("str-day"),
      strFullDate,
      getDay = datetime.getDay(),
      getDate = datetime.getDate(),
      getMonth = datetime.getMonth();

    // Check the update condition.
    // if prevDate is '0', it will always update the date.
    if (prevDay !== null) {
      if (prevDay === getDay) {
        /**
         * If the date was not changed (meaning that something went wrong),
         * call updateDate again after a second.
         */
        nextInterval = 1000;
      } else {
        /**
         * If the day was changed,
         * call updateDate at the beginning of the next day.
         */

        // Calculate how much time is left until the next day.
        nextInterval =
          (23 - datetime.getHours()) * 60 * 60 * 1000 +
          (59 - datetime.getMinutes()) * 60 * 1000 +
          (59 - datetime.getSeconds()) * 1000 +
          (1000 - datetime.getMilliseconds()) +
          1;
      }
    }

    if (getDate < 10) {
      getDate = "0" + getDate;
    }

    strFullDate = arrDay[getDay] + " " + getDate + " " + arrMonth[getMonth];
    strDay.innerHTML = strFullDate;

    // If an updateDate timer already exists, clear the previous timer.
    if (timerUpdateDate) {
      clearTimeout(timerUpdateDate);
    }

    // Set next timeout for date update.
    timerUpdateDate = setTimeout(function () {
      updateDate(getDay);
    }, nextInterval);
  }

  /**
   * Updates the current time.
   * @private
   */
  function updateTime() {
    var strHours = document.getElementById("str-hours"),
      strConsole = document.getElementById("str-console"),
      strMinutes = document.getElementById("str-minutes"),
      strAmpm = document.getElementById("str-ampm"),
      datetime = tizen.time.getCurrentDateTime(),
      hour = datetime.getHours(),
      minute = datetime.getMinutes();

    strHours.innerHTML = hour;
    strMinutes.innerHTML = minute;

    if (hour < 12) {
      strAmpm.innerHTML = "AM";
      if (hour < 10) {
        strHours.innerHTML = "0" + hour;
      }
    } else {
      strAmpm.innerHTML = "PM";
    }

    if (minute < 10) {
      strMinutes.innerHTML = "0" + minute;
    }

    // Each 0.5 second the visibility of flagConsole is changed.
    if (flagDigital) {
      if (flagConsole) {
        strConsole.style.visibility = "visible";
        flagConsole = false;
      } else {
        strConsole.style.visibility = "hidden";
        flagConsole = true;
      }
    } else {
      strConsole.style.visibility = "visible";
      flagConsole = false;
    }
  }

  /**
   * Sets to background image as BACKGROUND_URL,
   * and starts timer for normal digital watch mode.
   * @private
   */
  function initDigitalWatch() {
    flagDigital = true;
    //document.getElementById("digital-body").style.backgroundImage = BACKGROUND_URL;
    interval = setInterval(updateTime, 500);
  }

  /**
   * Clears timer and sets background image as none for ambient digital watch mode.
   * @private
   */
  function ambientDigitalWatch() {
    flagDigital = false;
    clearInterval(interval);
    document.getElementById("digital-body").style.backgroundImage = "none";
    updateTime();
  }

  /**
   * Gets battery state.
   * Updates battery level.
   * @private
   */
  function updateBattery() {
    var elBatteryIcon = document.querySelector("#battery-icon"),
      elBatteryText = document.querySelector("#battery-text"),
      batteryLevel = Math.floor(battery.level * 100),
      batteryGrade = Math.floor(batteryLevel / 20),
      statusColor = ARR_COLOR[batteryGrade];

    elBatteryIcon.style.backgroundImage =
      "url('./images/color_status/battery_icon_" + statusColor + ".png')";
    elBatteryText.innerHTML = batteryLevel + "%";

    //console.log(batteryLevel);
  }

  /**
   * Cambia el atributo de visualización de dos elementos cuando ocurre un evento de clic
   * @private
   * @param {object} element1 - La identificación del primer elemento para cambiar la visualización.
   * @param {object} element2 - La identificación del segundo elemento para cambiar la pantalla.
   */
  function toggleElement(element1, element2) {
    if (document.querySelector(element1).style.display === "none") {
      document.querySelector(element1).style.display = "block";
      document.querySelector(element2).style.display = "none";
    } else {
      document.querySelector(element1).style.display = "none";
      document.querySelector(element2).style.display = "block";
    }
  }

  /**
   * Updates watch screen. (time and date)
   * @private
   */
  function updateWatch() {
    updateTime();
    updateDate(0);
  }

  /**
   * Binds events.
   * @private
   */

  // Listener par aactivarse
  function bindEvents() {
    var elBattery = document.querySelector("#body-battery");
    var elBattery = document.querySelector("#body-battery");

    // Adds event listeners para actualizar el estado de la batería cuando se cambia la batería.
    battery.addEventListener("chargingchange", updateBattery);
    battery.addEventListener("chargingtimechange", updateBattery);
    battery.addEventListener("dischargingtimechange", updateBattery);
    battery.addEventListener("levelchange", updateBattery);

    // Evento para cuando cambia el estado de carga
    battery.addEventListener("chargingchange", function (event) {
      var elBatteryIcon = document.querySelector("#battery-icon");

      if (event.target.charging) {
        //console.log("El dispositivo está conectado y cargando.");
        // Cambiar la imagen del ícono de la batería cuando está cargando
        elBatteryIcon.style.backgroundImage ="url('./images/color_status/Cargando.png')";

        // Realiza otras acciones cuando el dispositivo comienza a cargarse
      } else {
        //console.log("El dispositivo ya no está cargando.");
        // Restaurar la imagen del ícono de la batería cuando deja de cargarse
        updateBattery(); // Restaura la imagen normal llamando a la función de actualización
        // Realiza otras acciones cuando el dispositivo deja de cargarse
      }
    });

   
    // add eventListener for timetick
    window.addEventListener("timetick", function () {
      ambientDigitalWatch();
    });

    // add eventListener for ambientmodechanged
    window.addEventListener("ambientmodechanged", function (e) {
      if (e.detail.ambientMode === true) {
        // rendering ambient mode case
        ambientDigitalWatch();
      } else {
        // rendering normal digital mode case
        initDigitalWatch();
      }
    });

    // add eventListener para actualizar la pantalla inmediatamente cuando el dispositivo se activa.
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        updateWatch();
      }
    });

    // add event listeners to update watch screen when the time zone is changed.
    tizen.time.setTimezoneChangeListener(function () {
      updateWatch();
    });
  }

  //funcion para mostrar los pasos

  function pasosActuales(pedometerData) {
    //obtiene los pasos actuales totales
    stepActual = pedometerData.cumulativeTotalStepCount;
    mostrarPasos();
  }

  function pasosTotales(pedometerData) {
    //obtiene los pasos  totales del dispositivo
    stepTotal = pedometerData.accumulativeTotalStepCount;
  }

  //Si hay permiso se obtiene la llamada para ver el total de pasos

  function onSuccess(pedometerData) {
    tizen.humanactivitymonitor.start("PEDOMETER", pasosActuales);
    tizen.humanactivitymonitor.setAccumulativePedometerListener(pasosTotales);
  }

  function onError(error) {
    //console.log("Error occurred: " + error.message);
  }

  //muestra iconos en pantalla
  function mostarIconos() {
    const imgBotasPath = "images/PNG/Iconos/Botas.png";
    const imgEspadasPath = "images/PNG/Iconos/Espadas.png";
    const imgCorazonPath = "images/PNG/Iconos/Corazon.png";
    const imgPocionPath = "images/Gif/Eventos/pocionGif.gif";
    const imgCalaveraPath = "images/PNG/Iconos/Calavera.png";
    const imgVSPath = "images/PNG/Iconos/VS.png";

    // Imagen de Espadas
    const imgEspadas = document.createElement("img");
    imgEspadas.src = imgEspadasPath;
    imgEspadas.className = "espadasSize";

    // Imagen de Botas
    const imgBotas = document.createElement("img");
    imgBotas.src = imgBotasPath;
    imgBotas.className = "botasSize";

    // Imagen de Corazon
    const imgCorazon = document.createElement("img");
    imgCorazon.src = imgCorazonPath;
    imgCorazon.className = "corazonSize";

    // Imagen de Pocion
    const imgPocion = document.createElement("img");
    imgPocion.src = imgPocionPath;
    imgPocion.className = "pocionSize";

    // Imagen de Calavera
    const imgCalavera = document.createElement("img");
    imgCalavera.src = imgCalaveraPath;
    imgCalavera.className = "calaveraSize";

    // Imagen de VS
    const imgVS = document.createElement("img");
    imgVS.src = imgVSPath;
    imgVS.className = "vsSize";

    // Contenedor para los iconos de Datos
    const containerDiv = document.createElement("div");

    containerDiv.appendChild(imgBotas);
    containerDiv.appendChild(imgEspadas);
    containerDiv.appendChild(imgPocion);
    containerDiv.appendChild(imgCalavera);

    //Container Datos
    const pasosContainer = document.getElementById("Contenedordatos");
    pasosContainer.appendChild(containerDiv);

    //Container Paisaje
    const paisajeContainer = document.getElementById("paisajeContainer");
    paisajeContainer.appendChild(imgCorazon);

    //Container Combate
    const infoContainer = document.getElementById("combate");
    infoContainer.appendChild(imgVS);
  }

  /**
   * Inicializa la fecha y la hora.
   * Establece en modo digital.
   * @private
   */
  function init() {
    // Solicitar permiso al usuario para acceder al sensor
    tizen.ppm.requestPermission(
      "http://tizen.org/privilege/healthinfo",
      onSuccess,
      onError
    );

    initDigitalWatch();
    updateDate(0);
    bindEvents();
    mostarIconos();
    mostrarPasos();
    movAleatorio();
  }

  window.onload = init();
})();
