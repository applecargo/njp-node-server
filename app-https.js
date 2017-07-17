var fs = require('fs');

var privateKey  = fs.readFileSync('/etc/letsencrypt/live/choir.run/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/choir.run/fullchain.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var https = require('https');
var httpsServer = https.createServer(credentials, function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Not implemented\n');
}).listen(9001);

// var express = require('express');
var BinaryServer = require('binaryjs').BinaryServer;
var binaryServer = new BinaryServer({ server: httpsServer });
// var fs = require('fs');
var wav = require('wav');

// var port = 3700;
var outFile = 'demo.wav';
// var app = express();

// app.set('views', __dirname + '/tpl');
// app.set('view engine', 'jade');
// app.engine('jade', require('jade').__express);
// app.use(express.static(__dirname + '/public'))

// app.get('/', function(req, res){
//   res.render('index');
// });

// app.listen(port);

// console.log('server open on port ' + port);

console.log('binary server launching...');
// binaryServer = BinaryServer({port: 9001});

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
