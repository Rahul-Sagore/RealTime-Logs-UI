### RealTime-Logs-UI
See live updates of Server log file using the web UI (Node.js and NPM required to run the project)

#####Installation:

1. Go to repository folder "cd repo_name"
2. Run: ```npm install``` command to install project dependency (that is socket.io in our case)
3. In root folder, you will find "tail-node.js". You can put it anywhere on your server where you want to monitor log files
4. To monitor log file changes, run: ```node tail-node.js log_file_name.log``` command (This command will monitor that file for any changes, you should use the filename as the command line argument to let the tail-node.js file know that which file it has to monitor)
5. Run a http server in project repository, to see the UI in browser. (e.g. - You can use: ```python -m SimpleHTTPServer``` command if you have python installed. It will run the project on port: 8000)
6. Open URL - "http://localhost:8000/" (This will display the live updates of the above logfile)

Below is the screenshot of Web UI. I have designed it like a terminal.

![UI-Screenshot](https://raw.githubusercontent.com/Rahul-Sagore/RealTime-Logs-UI/master/img/screenshot-1.png)

