// MAIN JAVSCRIPT CODE FOR CONNECTING TO SERVER

// PRIVATE SCOPE
(function () {

  var socket = io.connect("http://localhost:8080"); //Socket Connection
  var log_section = document.getElementById("log-section"); //Log Container

  // On File changed event sent by the server
  socket.on("changed", function(data){
    var accumulate = "";
    var log_length = data.data.length;

    // Updating DOM
    for(var i = 0; i < log_length; i++) {
      accumulate += "<div>" + data.data[i] + "</div>";
    }
    log_section.innerHTML +=  accumulate;

    // Keep the terminal scrolling
    updateScroll()
  });

  function updateScroll(){
    log_section.scrollTop = log_section.scrollHeight;
  }
})();