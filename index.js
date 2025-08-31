    // CS55-13-Fall-2025-Week-02-Estevan-Chavira

    // use http package (shared code) from node.js
    const myhttp = require("http");

    // use file system to read files, using promises for callbacks
    const fs = require("fs").promises;

    // reusable arrow function to send response
    const sendFileContents = (myresponse, mimeType, contents) => {
    myresponse.setHeader("Content-Type", mimeType + "; charset=UTF-8");
    myresponse.writeHead(200);
    myresponse.end(contents);
    };

    // create a function to respond to http request
    const requestListener = function( myrequest, myresponse ) {
        console.log( myrequest.url );

        if( myrequest.url === '/' ) {
            // check request url, if root, return html file
            fs.readFile(__dirname + "/game-gallery.html")
                .then(contents => sendFileContents(myresponse, "text/html", contents));
        } else {
            // if request url not root, return json file
            fs.readFile(__dirname + "/myfavoritevideogames.json")
                .then(contents => sendFileContents(myresponse, "application/json", contents));
        }
    };

    // use http package createSever()
    // that runs a web server
    let myserver = myhttp.createServer(
        // createServer() uses our function to run when request comes in
        requestListener
    );

    // ask http to start listening on a tcp port for incoming http request
    // listen() takes 2 args: 1: tcp port#, string of the ip address to listen (0.0.0.0)
    //http://127.0.0.1:3000/
    myserver.listen( 3000, "127.0.0.1" );