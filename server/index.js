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

//GDAX WS connection
const heartbeat = {
  type: "subscribe",
  product_ids: ["BTC-USD"],
  channels: ["heartbeat", "ticker"]
};

wsGDAX.on("open", () => {
  wsGDAX.send(JSON.stringify(heartbeat));
});

wsGDAX.on("message", data => {
  console.log("-", data);
});

//Clientside WS connection
wsServer.on("connection", ws => {
  wsGDAX.on("message", data => {
    ws.send(data);
  });
});

// wsServer.on('close', )

server.listen(8080, () => {
  console.log("Listening on %d", server.address().port);
});
