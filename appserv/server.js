const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
var cors = require('cors');

app.use(express.static(path.join("/usr/work/smart_front_oussema", 'build')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());

app.get('/*', function(req, res) { 
 
  res.sendFile(path.join('', '/usr/work/smart_front_oussema/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

var https = require('https');
var forceSsl = require('express-force-ssl');
var optionsss = {
  ca: fs.readFileSync('/etc/letsencrypt/live/imodo.ai/chain.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/imodo.ai/cert.pem', 'utf8'),
  key: fs.readFileSync('/etc/letsencrypt/live/imodo.ai/privkey.pem', 'utf8')
};
var server = https.createServer(optionsss, app)
server.setTimeout(10 * 60 * 1000)
server.listen(443);

app.listen(80, function () {
  console.log('Node app is running on port 80');
})