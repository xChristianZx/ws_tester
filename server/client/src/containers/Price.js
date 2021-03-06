import React, { Component } from "react";
import Market from "../components/Market";
import classNames from "classnames";

class Price extends Component {
  constructor() {
    super();
    this.state = {
      product: "BTC-USD",
      spotPrice: "",
      open_24h: "",
      high_24h: "",
      low_24h: "",
      side: ""
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:8000");
    this.socket.addEventListener("message", msg => {
      let data = JSON.parse(msg.data);
      console.log(data);
      if (data.type === "ticker") {
        this.setState({
          spotPrice: data.price,
          open_24h: data.open_24h,
          high_24h: data.high_24h,
          low_24h: data.low_24h,
          side: data.side
        });
      }
    });
  }

  render() {
    const { spotPrice, open_24h, high_24h, low_24h, side } = this.state;
    return (
      <div>
        <p>Price: {spotPrice}</p>
        <p>Side: {side}</p>
        <p>Open: {open_24h}</p>
        <p>High: {high_24h}</p>
        <p>Low: {low_24h}</p>
        <Market props={this.state} />
      </div>
    );
  }
}

export default Price;
