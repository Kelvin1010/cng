const sseService = require('./sse.service');

const getTime = () => new Date().toLocaleTimeString();

async function get(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  // setInterval(() => {
  //   response.write(`id: ${request.user.id}\n`);
  //   response.write(`data: ${JSON.stringify(headers) }\n\n`);
  // }, 5000);

  const newClient = sseService.connect(response);

  request.on('close', () => {
    sseService.close(newClient.id);
  });
}

module.exports = {
  get,
};
