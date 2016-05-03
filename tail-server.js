// REAL TIME DISPLAY LOAG UPDATE 
var server = require("http").createServer();
var io = require("socket.io")(server);
var fs = require("fs");

// SOCKET CONNECTION FOR EMITTING CHANGES
io.on("connection", function(client) {
  console.log("Client connected.. ");
  var logfile = process.argv[2]; //LOG FILE THAT NEED TO BE MONITORED
  var oldLength = 0;

  // Reading log file
  function sendLogs() {
    fs.readFile(logfile, 'utf8', function(err, contents) {
      var fileArray = contents.split("\n"); //Converting file lines into array
      var length = fileArray.length // Length of the array
      var linesToSend = []

      // slicing the length of the file based on previously update file
      if(oldLength > 0 && oldLength != length) {
        linesToSend = fileArray.slice(oldLength, length); //Server after the previously sent data
      } else if (oldLength == 0) {
        linesToSend = fileArray.slice(length-10, length); // Serve last 10 line for the first time
      }

      if(linesToSend.length) { //Check if there is any lines to send
        client.emit("changed", {data: linesToSend});
      }
      oldLength = length; //Update the current file's length
    });
  }
  sendLogs();

  // watch for the changes in the log file
  fs.watch(logfile, function(event, filename) {
    if(filename){
      sendLogs()
    }
  });
});
server.listen(8080); //Serve listening on this port