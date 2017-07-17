// njp center exhibition node server

//
var fs = require('fs');

//prepare database - sqlite3
var db;
var sqlite3 = require('sqlite3').verbose();
fs.access('voices', fs.constants.R_OK | fs.constants.W_OK, (err) => {
  //if there's no (database) file called 'voices', create and prepare db in it.
  if (err) {
    db = new sqlite3.Database('voices');
    db.serialize(function() {
      db.run("CREATE TABLE user (id INT, dt TEXT)");

      var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
      for (var i = 0; i < 10; i++) {

        var d = new Date();
        var n = d.toLocaleTimeString();
        stmt.run(i, n);
      }
      stmt.finalize();

      db.each("SELECT id, dt FROM user", function(err, row) {
        console.log("User id : "+row.id, row.dt);
      });
    });
    console.log('created database "voices", and let it ready to use.');
  } else {
    //if there is the database, do nothing
    console.log('found database "voices", and just use it.');
  }
});

//prepare credentials & etc
var https = require('https');
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/choir.run/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/choir.run/fullchain.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

//https+BinaryJS server @ port 9001
var wav = require('wav');
var outFile = 'demo.wav';
var httpsBinaryServer = https.createServer(credentials, function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Not implemented\n');
}).listen(9001);
//
var BinaryServer = require('binaryjs').BinaryServer;
var binaryServer = new BinaryServer({ server: httpsBinaryServer });
//
binaryServer.on('connection', function(client) {
  console.log('new connection');

  var fileWriter = new wav.FileWriter(outFile, {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });

  client.on('stream', function(stream, meta) {
    console.log('new stream');
    stream.pipe(fileWriter);

    stream.on('end', function() {
      fileWriter.end();
      console.log('wrote to file ' + outFile);
    });
  });
});

//https+WWW server @ port 443
var express = require('express');
var app = express();
var httpsWebServer = https.createServer(credentials, app).listen(443);

app.get('/', function(req, res){
  res.send('Hello, HI!');
});
