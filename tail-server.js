// REAL TIME DISPLAY LOAG UPDATE 
var express = require("express")
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var fs = require("fs");

// SOCKET CONNECTION FOR EMITTING CHANGES
io.on("connection", function(client) {
  console.log("Client connected.. ");
  var logfile = process.argv[2]; //LOG FILE THAT NEED TO BE MONITORED

  // Reading log file
  function sendLogs() {
    var fileContent = fs.readFileSync(logfile).toString();
    var position = fileContent.length;
    // Manipulating filecontent
    var contetnArray = fileContent.split("\n")
    var length = contetnArray.length
    var linesToSend = contetnArray.slice(length-10, length);

    emitChanges(linesToSend);

    // Watch for changes
    fs.watch(logfile, function(event, filename) {
      // Open file in read mode
      fs.open(logfile, "r", function(err, fd) {
        // Get stas of the file to see how much content has been changed
        // Then read that particular data only
        fs.fstat(fd, function(err, fstats){
          var difference = fstats.size - position;
          // Checking if file has changed
          if(difference) {
            var buffer = new Buffer(difference);
            fs.read(fd, buffer, 0, buffer.length, position, function (err, bytes) {
              if(bytes > 0) {
                changedContent = buffer.slice(0, bytes).toString();
                emitChanges(changedContent.split("\n"));
              }
            });
          }
          position = fstats.size
        })
      });
    });
  }

  // Emit Changes to web UI
  function emitChanges(content) {
    if(content.length) { //Check if there is any lines to send
      client.emit("changed", {data: content});
    }
  }
});

// WEB UI ROUTING And SERVING STATIC FILES
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})

server.listen(8080); //Serve listening on this port