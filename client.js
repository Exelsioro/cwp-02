const net = require('net');
const port = 8124;

const client = new net.Socket();

client.setEncoding('utf8');

var stdin = process.openStdin();

client.connect(port, function() {
  console.log('Connected');
  stdin.addListener("data", function(d) {
      if(d.toString().trim() === "Q"){
      client.destroy();
      process.exit(-1);}
      else {
        client.write(" entered: [" + d.toString().trim() + "]");
      }
    });
});

client.on('data', function(data) {
  console.log(data);
});

client.on('close', function() {
  console.log('Connection closed');
});
