import React, { Component } from "react";
import Market from "../components/Market";
// eslint-disable-next-line
import { connect } from "react-redux";
import { websocketConnecting } from "../actions/index";
import wsHelper from "../services/socket2";

class Price extends Component {
  constructor(props) {
    super(props);
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
    wsHelper();
    // const socket = new WebSocket("ws://localhost:8000");
    // console.log("Here I am", socket.readyState);

    // socket.onopen = msg => {
    //   console.log("Websocket state:", msg.type);
    // };

    // socket.onmessage = msg => {
    //   // console.log(msg);
    //   const data = JSON.parse(msg.data);
    //   // console.log(data);
    //   if (data.type === "ticker") {
    //     this.setState({
    //       spotPrice: data.price,
    //       open_24h: data.open_24h,
    //       high_24h: data.high_24h,
    //       low_24h: data.low_24h,
    //       side: data.side
    //     });
    //   }
    // };

    // socket.onerror = err => {
    //   console.log("Websocket Error", err);
    // };

    // socket.onclose = msg => {
    //   console.log("WebSocket Closed:", msg);
    // };
  }

  render() {
    return (
      <div>
        <Market data={this.state} />
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   {
//     data: state.data;
//   }
// }

// export default connect(mapStateToProps)(Price);
export default Price;
