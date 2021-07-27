// ****************************************************************
// ****** HECHO POR FERNANDO LECUNA - nando1209@hotmail.com *******
// ****************************************************************

// Seleccion de tipo de calculo
// Esto viene de la botonera de selección al pie de la pagina

function comienzo() {
   // Variables globales
   calculoActivo = "";
   // Event Listener para botones de botonera seleccion de tipo de calculo
   document.getElementById("botonTraspasoInmueble").addEventListener("click", function() {
      seleccionCalculo("inmueble")
   });
   document.getElementById("botonTraspasoCarro").addEventListener("click", function() {
      seleccionCalculo("carro")
   });
   document.getElementById("botonHonorarios").addEventListener("click", function() {
      seleccionCalculo("honorarios")
   });
   // CSS del boton
   document.getElementById("botonTraspasoInmueble").classList.add("botonOutFocus");
   document.getElementById("botonTraspasoCarro").classList.add("botonOutFocus");
   document.getElementById("botonHonorarios").classList.add("botonOutFocus");
   // Titulo de la pagina
   document.getElementById("tituloEncabezado").innerHTML = "SELECCIONE UN TIPO DE CALCULO";
}

// Funcion de seleccion de tipo de calculo
function seleccionCalculo(tipoCalculo) {
   if (tipoCalculo == "inmueble") {
      calculoActivo = "inmueble";
      botonActivo();
   }
   if (tipoCalculo == "carro") {
      calculoActivo = "carro";
      botonActivo();
   }
   if (tipoCalculo == "honorarios") {
      calculoActivo = "honorarios";
      botonActivo();
   }
}

// Funcion de CSS sobre el Boton Activo
function botonActivo() {
   if (calculoActivo == "inmueble") {
      // CSS del boton
      document.getElementById("botonTraspasoInmueble").classList.remove("botonOutFocus");
      document.getElementById("botonTraspasoCarro").classList.add("botonOutFocus");
      document.getElementById("botonHonorarios").classList.add("botonOutFocus");
      // Titulo de la pagina
      document.getElementById("tituloEncabezado").innerHTML = "CALCULO DE TRASPASO DE UN INMUEBLE";
      // Cuadro de Resultado
      document.getElementById("resultadoInmueble").style.display = "block";
      document.getElementById("resultadoCarro").style.display = "none";
      document.getElementById("resultadoHonorarios").style.display = "none";
   }
   if (calculoActivo == "carro") {
      document.getElementById("botonTraspasoInmueble").classList.add("botonOutFocus");
      document.getElementById("botonTraspasoCarro").classList.remove("botonOutFocus");
      document.getElementById("botonHonorarios").classList.add("botonOutFocus");
      // Titulo de la pagina
      document.getElementById("tituloEncabezado").innerHTML = "CALCULO DE TRASPASO DE UN VEHICULO";
      // Cuadro de Resultado
      document.getElementById("resultadoInmueble").style.display = "none";
      document.getElementById("resultadoCarro").style.display = "block";
         resultadoHonorarios
      document.getElementById("resultadoHonorarios").style.display = "none";
   }
   if (calculoActivo == "honorarios") {
      document.getElementById("botonTraspasoInmueble").classList.add("botonOutFocus");
      document.getElementById("botonTraspasoCarro").classList.add("botonOutFocus");
      document.getElementById("botonHonorarios").classList.remove("botonOutFocus");
      // Titulo de la pagina
      document.getElementById("tituloEncabezado").innerHTML = "CALCULO DE HONORARIOS GENERALES";
      // Cuadro de Resultado
      document.getElementById("resultadoInmueble").style.display = "none";
      document.getElementById("resultadoCarro").style.display = "none";
      document.getElementById("resultadoHonorarios").style.display = "block";
   }
}

// Funcion para la generacion del monto en colones y el tipo de calculo a realizar
function calcularMontoColones(moneda) {
   montoFinal = "";
   // procesamiento del monto
   monto = document.getElementById("montoCalculo").value;

   if (isNaN(monto) || monto != "") {
      montoFinal = ""
      for (var i = 0; i < monto.length; i++) {
         if (monto.charAt(i) != ',') {
            montoFinal = montoFinal + monto.charAt(i)
         }
      }
      montoFinal = parseInt(montoFinal);
   }
   // seleccion de moneda
   if (moneda == "dolar") {
      tipoCambio = document.getElementById("tipoCambio").value;
      if (tipoCambio < 400 || tipoCambio > 1000) {
         alert("Tipo de cambio erroneo");
      } else {
         montoFinal = parseInt(montoFinal * tipoCambio);
      }
   }

   // Dependiendo el tipo seleccionado realizamos el cálculo
   if (calculoActivo == "inmueble") {
      realizarCalculoInmueble(montoFinal);
   }
   if (calculoActivo == "carro") {
      realizarCalculoCarro(montoFinal);
   }
   if (calculoActivo == "honorarios") {
      calcularHonorariosGenerales(montoFinal);
   }
}

//****************************************************************************************
//****************************************************************************************
//****************************************************************************************
// Funcion calcular Inmueble
function realizarCalculoInmueble(monto) {
   // Desplegar Costo Total del Traspaso

   // Desplegar monto del inmueble en colones
   document.getElementById("valorInmuebleColones").innerHTML = redondear(monto);
   // Desplegar monto del Timbre Registro Nacional
   TRN = redondear(timbreRegistroNacionalF(monto));
   document.getElementById("timbreRegistroNacionalInmueble").innerHTML = TRN;
   // Desplegar monto del Timbre Agrario
   TA = redondear(timbreAgrarioF(monto));
   document.getElementById("timbreAgrarioInmueble").innerHTML = TA;
   // Desplegar monto del Timbre Fiscal
   TF = redondear(timbreFiscalF(monto));
   document.getElementById("timbreFiscalInmueble").innerHTML = TF;
   // Desplegar monto del Timbre de Archivo Nacional
   TAN = redondear(timbreArchivoNacionalF(monto));
   document.getElementById("timbreArchivoNacionalInmueble").innerHTML = TAN;
   // Desplegar monto del Timbre de Colegio de Abogados
   TCA = redondear(timbreColegioAbogadosF(monto));
   document.getElementById("timbreColegioAbogadosInmueble").innerHTML = TCA;
   // Desplegar monto del Impuesto de Traspaso
   IT = redondear(monto * .015);
   document.getElementById("impuestoTraspasoInmueble").innerHTML = IT;
   // Desplegar monto del Timbre Municipal
   TM = redondear(timbreMunicipalF(monto));
   document.getElementById("timbreMunicipalImpuesto").innerHTML = TM;
   // Desplegar monto de Honorarios de Notario
   HN = redondear(calculoHonorariosTarifaF(monto));
   document.getElementById("honorariosTraspasoInmueble").innerHTML = HN;
   // Desplegar monto de IVA de Honorarios Traspaso Inmueble
   IHN = redondear(calculoHonorariosTarifaF(monto) * .13);
   document.getElementById("IVAhonorariosTraspasoInmueble").innerHTML = IHN;
   // Desplegar monto total de Traspaso Inmueble
   totalTraspasoInmueble = redondear(timbreRegistroNacionalF(monto) + timbreAgrarioF(monto) + timbreFiscalF(monto) + timbreArchivoNacionalF(monto) + timbreColegioAbogadosF(monto) + monto * .015 + timbreMunicipalF(monto) + calculoHonorariosTarifaF(monto) + calculoHonorariosTarifaF(monto) * .13);

   // 56796000

   document.getElementById("costoTraspasoInmueble").innerHTML = totalTraspasoInmueble;
}

//****************************************************************************************
//****************************************************************************************
//****************************************************************************************
// Funcion calcular Carro
function realizarCalculoCarro(monto) {
   // Desplegar Costo Total del Traspaso

   // Desplegar monto del inmueble en colones
   document.getElementById("valorCarroColones").innerHTML = redondear(monto);
   // Desplegar monto del Timbre Registro Nacional
   TRN = redondear(timbreRegistroNacionalF(monto));
   document.getElementById("timbreRegistroNacionalCarro").innerHTML = TRN;
   // Desplegar monto del Timbre Parques Nacionales
   TPN = redondear(timbreParquesNacionalesF(monto));
   document.getElementById("timbreParquesNacionalesCarro").innerHTML = TPN;
   // Desplegar monto del Timbre Agrario
   TA = redondear(timbreAgrarioF(monto));
   document.getElementById("timbreAgrarioCarro").innerHTML = TA;
   // Desplegar monto del Timbre Fiscal
   TF = redondear(timbreFiscalF(monto));
   document.getElementById("timbreFiscalCarro").innerHTML = TF;
   // Desplegar monto del Timbre de Archivo Nacional
   TAN = redondear(timbreArchivoNacionalF(monto));
   document.getElementById("timbreArchivoNacionalCarro").innerHTML = TAN;
   // Desplegar monto del Timbre de Colegio de Abogados
   TCA = redondear(timbreColegioAbogadosF(monto));
   document.getElementById("timbreColegioAbogadosCarro").innerHTML = TCA;
   // Desplegar monto del Timbre Cruz Roja
   TCR = redondear(timbreCruzRojaF(monto));
   document.getElementById("timbreCruzRojaCarro").innerHTML = TCR;
   // Desplegar monto del Impuesto de Traspaso
   IT = redondear(monto * .025);
   document.getElementById("impuestoTraspasoCarro").innerHTML = IT;
   // Desplegar monto de Honorarios de Notario
   HN = redondear(calculoHonorariosTarifaF(monto));
   document.getElementById("honorariosTraspasoCarro").innerHTML = HN;
   // Desplegar monto de IVA de Honorarios Traspaso Carro
   IHN = redondear(calculoHonorariosTarifaF(monto) * .13);
   document.getElementById("IVAhonorariosTraspasoCarro").innerHTML = IHN;
   // Desplegar monto total de Traspaso Carro
   totalTraspasoCarro = redondear(timbreRegistroNacionalF(monto) + timbreParquesNacionalesF(monto) + timbreAgrarioF(monto) + timbreFiscalF(monto) + timbreArchivoNacionalF(monto) + timbreColegioAbogadosF(monto) + timbreCruzRojaF(monto) + monto * .025 + calculoHonorariosTarifaF(monto) + calculoHonorariosTarifaF(monto) * .13);

   document.getElementById("costoTraspasoCarro").innerHTML = totalTraspasoCarro;
}

//****************************************************************************************
//****************************************************************************************
//****************************************************************************************
function calcularHonorariosGenerales(monto){
   document.getElementById("montoTrabajoARealizar").innerHTML = redondear(monto);
   honorariosGenerales = 0;




   if (monto > 33000000) {
      honorariosGenerales = 11000000 * .02 + 5499999 * .015 + 16499999 * .0125 + (monto - 33000000) * .01;
      document.getElementById("montoHonorariosFranja1").innerHTML = redondear(11000000 * .02);
      document.getElementById("montoHonorariosFranja2").innerHTML = redondear(5499999 * .015);
      document.getElementById("montoHonorariosFranja3").innerHTML = redondear(16499999 * .0125);
      document.getElementById("montoHonorariosFranja4").innerHTML = redondear((monto - 33000000) * .01);
      document.getElementById("montoTotalHonorarios").innerHTML = redondear(honorariosGenerales);
   } else if (monto > 16500000) {
      honorariosGenerales = 11000000 * .02 + 5499999 * .015 + (monto - 16500000) * .0125;
      document.getElementById("montoHonorariosFranja1").innerHTML = redondear(11000000 * .02);
      document.getElementById("montoHonorariosFranja2").innerHTML = redondear(5499999 * .015);
      document.getElementById("montoHonorariosFranja3").innerHTML = redondear((monto - 16499999) * .0125);
      document.getElementById("montoHonorariosFranja4").innerHTML = redondear(0);
      document.getElementById("montoTotalHonorarios").innerHTML = redondear(honorariosGenerales);
   } else if (monto > 11000000) {
      honorariosGenerales = 11000000 * .02 + (monto - 11000000) * .015;
      document.getElementById("montoHonorariosFranja1").innerHTML = redondear(11000000 * .02);
      document.getElementById("montoHonorariosFranja2").innerHTML = redondear((monto - 11000000) * .015);
      document.getElementById("montoHonorariosFranja3").innerHTML = redondear(0);
      document.getElementById("montoHonorariosFranja4").innerHTML = redondear(0);
      document.getElementById("montoTotalHonorarios").innerHTML = redondear(honorariosGenerales);
   } else if (monto > 0) {
      honorariosGenerales = monto * .02;
      document.getElementById("montoHonorariosFranja1").innerHTML = redondear(monto * .02);
      document.getElementById("montoHonorariosFranja2").innerHTML = redondear(0);
      document.getElementById("montoHonorariosFranja3").innerHTML = redondear(0);
      document.getElementById("montoHonorariosFranja4").innerHTML = redondear(0);
      if (honorariosGenerales < 60500) {
         document.getElementById("aplicaMontoMinimo").innerHTML = "APLICA MONTO MINIMO";
         document.getElementById("montoMinimoAplicado").innerHTML = 60500;
         document.getElementById("montoHonorariosFranja1").innerHTML = redondear(0);
      document.getElementById("montoHonorariosFranja2").innerHTML = redondear(0);
      document.getElementById("montoHonorariosFranja3").innerHTML = redondear(0);
      document.getElementById("montoHonorariosFranja4").innerHTML = redondear(0);
         document.getElementById("montoTotalHonorarios").innerHTML = redondear(60500);
      } else {
         document.getElementById("aplicaMontoMinimo").innerHTML = ".";
         document.getElementById("montoMinimoAplicado").innerHTML = 0;
         document.getElementById("montoTotalHonorarios").innerHTML = redondear(honorariosGenerales);
      }
   }
}

//****************************************************************************************
//****************************************************************************************
//****************************************************************************************
// Calculo de Timbres y Honorarios
// Timbre Registro Nacional
function timbreRegistroNacionalF(monto) {
   millares = millarOFraccion(monto);
   descuento = .94;
   return millares * 5 * descuento;
}
// Timbre Registro Nacional
function timbreParquesNacionalesF(monto) {
   valor = 500;
   descuento = .94;
   return valor * descuento;
}
// Timbre Agrario
function timbreAgrarioF(monto) {
   millares = millarOFraccion(monto);
   if (calculoActivo == "inmueble") {
      return millares * 1.5;
   } else {
      return millares * 3;
   }
}
// Timbre Fiscal
function timbreFiscalF(monto) {
   if (monto > 0) timbreFiscal = 12.5;
   if (monto > 25000) timbreFiscal = 25;
   if (monto > 75000) timbreFiscal = 31.25;
   if (monto > 100000) timbreFiscal = 62.5;
   if (monto > 250000) timbreFiscal = 125;
   if (monto > 500000) timbreFiscal = 156.25;
   if (monto > 1000000) timbreFiscal = 312.5;
   if (monto > 1500000) timbreFiscal = 625;
   descuento = .94;
   return timbreFiscal * descuento;
}
// Timbre Archivo Nacional
function timbreArchivoNacionalF(monto) {
   if (monto < 100000) timbreArchivoNacional = 10;
   if (monto >= 100000) timbreArchivoNacional = 20;
   descuento = .94;
   return timbreArchivoNacional * descuento;
}
// Timbre Colegio de Abogados
function timbreColegioAbogadosF(monto) {
   timbreColegio = 0;
   if (monto <= 250000) timbreColegio = 0;
   if (monto > 250000 && monto <= 1000000) timbreColegio = 1100;
   if (monto > 1000000 && monto <= 5000000) timbreColegio = 2200;
   if (monto > 5000000 && monto <= 25000000) timbreColegio = 5500;
   if (monto > 25000000 && monto <= 50000000) timbreColegio = 11000;
   if (monto > 50000000 && monto <= 100000000) timbreColegio = 16500;
   if (monto > 100000000 && monto <= 500000000) timbreColegio = 27500;
   if (monto > 500000000) timbreColegio = 55000;

   descuento = .94;
   return timbreColegio * descuento;
}
// Calculo Timbre Cruz Roja
function timbreCruzRojaF(monto) {
   valor = 500;
   descuento = .94;
   return valor * descuento;
}
// Impuesto de Traspaso
   // El impuesto de Traspaso se calcula en la línea donde se despliega el monto del Impuesto de Traspaso
// Calculo Timbre Municipal
function timbreMunicipalF(monto) {
   millares = millarOFraccion(monto);
   descuento = .94;
   return millares * 2 * descuento;
}
// Calculo Honorarios Notario
function calculoHonorariosTarifaF(monto) {
   honorariosTotales = 0;
   if (monto <= 11000000) {
      honorariosTotales = monto * .02;
   }
   if (monto > 11000000 && monto <= 16500000) {
      honorariosTotales = 11000000 * .02;
      honorariosTotales = honorariosTotales + ((monto - 11000000) * .015);
   }
   if (monto > 16500000 && monto <= 33000000) {
      honorariosTotales = 11000000 * .02;
      honorariosTotales = honorariosTotales + (5500000 * .015);
      honorariosTotales = honorariosTotales + ((monto - 16500000) * .0125);
   }
   if (monto > 33000000) {
      honorariosTotales = 11000000 * .02;
      honorariosTotales = honorariosTotales + (5500000 * .015);
      honorariosTotales = honorariosTotales + (16500000 * .0125);
      honorariosTotales = honorariosTotales + ((monto - 33000000) * .01);
   }
   if (honorariosTotales < 60500) {
      honorariosTotales = 60500;
   }
   return honorariosTotales;
}

// Funciones
// Funcion para redondear numeros
function redondear(monto) {
   monto = Math.floor(monto);
   return monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// Funcion para redondear millares
function millarOFraccion (monto){
   millares = Math.floor(monto / 1000);
   if (monto % 1000 > 0) {
   millares = millares + 1;
   }
   return millares;
}