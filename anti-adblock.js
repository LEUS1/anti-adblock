document.addEventListener("DOMContentLoaded", function () {
  // Crear un div ficticio para detectar bloqueos
  var testAd = document.createElement("div");
  testAd.className = "adsbygoogle";
  testAd.style.position = "absolute";
  testAd.style.top = "-9999px";
  document.body.appendChild(testAd);

  // Bandera para detectar bloqueador de anuncios
  var isAdblockActive = false;

  // Intentar cargar un script publicitario bloqueado
  var script = document.createElement("script");
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  script.async = true;
  script.onerror = function () {
    isAdblockActive = true;
    showAdblockWarning();
  };
  document.body.appendChild(script);

  // Comprobar si el div ficticio está bloqueado
  setTimeout(function () {
    if (
      isAdblockActive || 
      testAd.offsetParent === null || 
      testAd.offsetHeight === 0 || 
      testAd.offsetWidth === 0
    ) {
      showAdblockWarning();
    }
    testAd.remove();
  }, 500);

  // Mostrar advertencia de AdBlock
  function showAdblockWarning() {
    var antiAdblockDiv = document.getElementById("anti-adblock");
    antiAdblockDiv.style.display = "block";  // Hacer visible el aviso
    document.body.classList.add("blocked");

    // Verificar si el AdBlock se desactiva
    var interval = setInterval(function () {
      var test = document.createElement("div");
      test.className = "adsbygoogle";
      test.style.position = "absolute";
      test.style.top = "-9999px";
      document.body.appendChild(test);

      if (test.offsetParent !== null && test.offsetHeight > 0 && test.offsetWidth > 0) {
        clearInterval(interval);
        document.getElementById("anti-adblock").style.display = "none";
        location.reload();
      }
      test.remove();
    }, 1000);
  }
});
