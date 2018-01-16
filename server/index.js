const express = require("express");
const http = require("http");
const url = require("url");
const WebSocket = require("ws");

const app = express();

const GDAX_ENDPOINT = "wss://ws-feed.gdax.com";
const server = http.createServer(app);
const wsGDAX = new WebSocket(GDAX_ENDPOINT);
const wsServer = new WebSocket.Server({ port: 8000, clientTracking: true });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/public/index.html");
});

/* 
GDAX WS connection
*/

const heartbeat = {
  type: "subscribe",
  product_ids: ["BTC-USD"],
  channels: ["heartbeat", "ticker"]
};

// Send Heartbeat
wsGDAX.on("open", gdax => {
  wsGDAX.send(JSON.stringify(heartbeat));
  console.log("WS Connection with GDAX open");
});

//Broadcast Data to Clients
wsGDAX.on("message", data => {
  wsServer.broadcast(data);
  // console.log("-", data);
});

wsGDAX.on("close", msg => {
  console.log("GDAX connection closed: ", msg);
});

//Broadcast Function
wsServer.broadcast = function broadcast(data) {
  wsServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

//Server to Client Connection
wsServer.on("connection", ws => {
  ws.send(
    JSON.stringify({
      type: "message",
      data: "Hello client"
    })
  );

  ws.on("message", msg => {
    console.log("Received: ", msg);
  });

  ws.on("close", (code, reason) => {
    console.log(`Client connection closed - ${reason} code: ${code}`);
  });

  // ws.onclose = msg => {
  //   console.log(msg);
  // };

  ws.on("error", err => {
    console.log("Serverside WS Error", err);
    ws.terminate();
  });
});

server.listen(8080, () => {
  console.log("Listening on %d", server.address().port);
});
