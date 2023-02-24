let clients = [];
function connect(res) {
  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response: res
  };

  clients.push(newClient);
  return newClient;
}

function close(id){
  console.log(`${id} Connection closed`);
  clients = clients.filter(client => client.id !== id);
}

function send(message, userid){

}

function broadcast(message){
  clients.forEach(client => {
    client.response.write(`data: ${message}`)
  })
}

module.exports = {
  connect,
  close,
  send,
  broadcast
};
