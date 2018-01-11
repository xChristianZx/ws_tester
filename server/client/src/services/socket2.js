export default function wsHelper() {
  const socket = new WebSocket("ws://localhost:8000");
  console.log("Here I am", socket.readyState);

  socket.onopen = msg => {
    console.log("Websocket state:", msg.type);
  };

  socket.onmessage = msg => {
    // console.log(msg);
    const data = JSON.parse(msg.data);
    // console.log(data);
    if (data.type === "ticker") {
      this.setState({
        spotPrice: data.price,
        open_24h: data.open_24h,
        high_24h: data.high_24h,
        low_24h: data.low_24h,
        side: data.side
      });
    }
  };

  socket.onerror = msg => {
    console.log("Websocket Error", msg);
  };

  socket.onclose = msg => {
    console.log("WebSocket Closed:", msg);
  };
}
