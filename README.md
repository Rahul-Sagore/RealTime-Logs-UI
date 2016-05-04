### RealTime-Logs-UI
See live updates of Server log file using the web UI (Node.js and NPM required to run the project)

#####Local Installation:

1. Go to repository folder "cd repo_name"
2. Run: ```npm install``` command to install project dependency (that is socket.io and express.js in our case)
3. In root folder, you will find "tail-node.js". You can put it anywhere to monitor log files
4. To monitor changes in log file, run: ```node tail-node.js log_file_name.log``` command (This command will monitor that file for any changes, you should use the filename as the command line argument to let the tail-node.js file know that which file it has to monitor)
5. After running above command, node starts a local server on port 8080.
6. Open URL - "http://localhost:8080/" (This will display the live updates of the logfile)

Below is the screenshot of Web UI. I have designed it like a terminal.

![UI-Screenshot](https://raw.githubusercontent.com/Rahul-Sagore/RealTime-Logs-UI/master/img/screenshot-1.png)

