import React, { Component } from "react";

class Price extends Component {
  constructor() {
    super();
    this.state = {
      price: ""
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:8000");

    this.socket.addEventListener("message", msg => {
      let data = JSON.parse(msg.data);
      console.log(data);
      if (data.type === "ticker") {
        this.setState({
          price: data.price
        });
      }
    });
  }

  render() {
    const { price } = this.state;
    return <div>{price ? <p>{price}</p> : <p>Loading...</p>}</div>;
  }
}

export default Price;
