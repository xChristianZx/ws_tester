const express = require("express");
const http = require("http");
const url = require("url");
const WebSocket = require("ws");

const app = express();

//Recreate socket.io Chat App with WS

const GDAX_ENDPOINT = "wss://ws-feed.gdax.com";
const server = http.createServer(app);
// const ws = new WebSocket(GDAX_ENDPOINT);
const wsServer = new WebSocket.Server({ port: 8000 });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

wsServer.on("connection", ws => {
  // console.log("Serverside:", ws);
  ws.on("message", msg => {
    console.log("incoming msg: %m", msg);
    ws.send(JSON.stringify(msg));
  });
});

// const heartbeat = {
//   type: "subscribe",
//   product_ids: ["BTC-USD", "ETH-USD"],
//   channels: ["heartbeat", "ticker"]
// };

// ws.on("open", () => {
//   ws.send(JSON.stringify(heartbeat));
// });

// ws.on("message", data => {
//   console.log("-", data);
// });

server.listen(8080, () => {
  console.log("Listening on %d", server.address().port);
});
