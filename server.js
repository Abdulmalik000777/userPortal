server.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.send('Welcome to the WebSocket server!');
});
