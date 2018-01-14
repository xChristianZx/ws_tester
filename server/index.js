const express = require("express");
const http = require("http");
const url = require("url");
const WebSocket = require("ws");

const app = express();

const GDAX_ENDPOINT = "wss://ws-feed.gdax.com";
const server = http.createServer(app);
const wsGDAX = new WebSocket(GDAX_ENDPOINT);
const wsServer = new WebSocket.Server({ port: 8000 });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/public/index.html");
});

/*
  * GDAX WS connection
*/

const heartbeat = {
  type: "subscribe",
  product_ids: ["BTC-USD"],
  channels: ["heartbeat", "ticker"]
};

// Send Heartbeat
wsGDAX.on("open", () => {
  wsGDAX.send(JSON.stringify(heartbeat));
  console.log("Serverside WS connection open");
});

//Connection to Clientside
// wsServer.on("connection", ws => {
//   wsGDAX.on("message", data => {
//     ws.send(data);
//   });
// });

wsServer.broadcast = function broadcast(data) {
  wsServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
wsGDAX.on("message", data => {
  // console.log("-", data);
  wsServer.broadcast(data);
});

wsServer.on("close", () => {
  console.log("Serverside WS Connection Closed");
});

wsServer.on("error", err => {
  console.log("Serverside WS Error:", err);
});

server.listen(8080, () => {
  console.log("Listening on %d", server.address().port);
});
