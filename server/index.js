const express = require("express");
const http = require("http");
const url = require("url");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);
const ws = new WebSocket("wss://ws-feed.gdax.com");

ws.on("open", () => {
  const heartbeat = {
    type: "subscribe",
    channels: [{ name: "heartbeat", product_ids: ["ETH-EUR"] }]
  };
  ws.send(JSON.stringify(heartbeat));
});

app.get("/", (req, res) => {
  ws.on("message", data => {
    console.log(data);
  });
});

server.listen(8080, () => {
  console.log("Listening on %d", server.address().port);
});
