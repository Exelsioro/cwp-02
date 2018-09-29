const net = require('net');
const port = 8124;
let seed = 0;
var clients = [];
const server = net.createServer(function(client){
  client.id = Date.now() + seed++;
  console.log('Client ' + client.id +' connected');
  clients.push(client);
  client.setEncoding('utf8');

  client.on('data', (data) => {
    console.log(client.id + " " +data);
    broadcast(client, data);

});
function broadcast(from, message){
  clients.forEach(function(socket, index, array){
    if(socket.id === from.id) return;
  // Dont send any messages to the sender
  socket.write(socket.id + " " + message);
})
  };

  client.on('end', () => console.log('Client disconnected'));
});

server.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});
