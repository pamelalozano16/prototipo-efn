$.ajax({
	url : "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SI561/datos?token=fbb00b1213b4ab6144d15d8693da9ad92bc6a7569b7f63aa3ddc835ccdcf5c43",
	jsonp : "callback",
	dataType : "jsonp", //Se utiliza JSONP para realizar la consulta cross-site
	success : function(response) {  //Handler de la respuesta
		var series=response.bmx.series;
        document.getElementById("libor").innerHTML=series[0].datos[0].dato
		console.log(series[0].datos[0].dato)
	}
});