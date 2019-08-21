console.log("hola")

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://170.128.120.91:8080/ibi_apps/rs/ibfs?IBIRS_action=signOn&IBIRS_userName=efactor1&IBIRS_password=efactor1",
    "method": "GET",
    "headers": {
        "Access-Control-Allow-Origin":"true",
      "Accept": "*/*",
      "Cache-Control": "no-cache",
    "Host": "170.128.120.91:8080",
      "Accept-Encoding": "gzip, deflate",
      "Connection": "keep-alive",
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

var url = "http://170.128.120.91:8080/ibi_apps/WFServlet?IBIF_ex=efactor_t2_g1_e.fex";
document.getElementById("theFrame").src=url;