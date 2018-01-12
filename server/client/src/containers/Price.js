import React, { Component } from "react";
import Market from "../components/Market";
import { connect } from "react-redux";
// import { websocketConnecting } from "../actions/index";
import wsData from "../actions/index";
import { bindActionCreators } from "redux";

class Price extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     product: "BTC-USD",
  //     spotPrice: "",
  //     open_24h: "",
  //     high_24h: "",
  //     low_24h: "",
  //     side: ""
  //   };
  // }

  componentDidMount() {
    this.wsSetup();
  }

  wsSetup = () => {
    const socket = new WebSocket("ws://localhost:8000");
    // console.log("Here I am", socket.readyState);

    socket.onopen = msg => {
      console.log("Websocket state:", msg.type);
    };

    socket.onmessage = msg => {
      // console.log(msg);
      const data = JSON.parse(msg.data);
      if (data.type === "ticker") {
        console.log(data);
        this.props.wsData(data);
      }
      // if (data.type === "ticker") {
      //   this.setState({
      //     spotPrice: data.price,
      //     open_24h: data.open_24h,
      //     high_24h: data.high_24h,
      //     low_24h: data.low_24h,
      //     side: data.side
      //   });
      // }
    };

    socket.onerror = msg => {
      console.log("Websocket Error", msg);
    };

    socket.onclose = msg => {
      console.log("WebSocket Closed:", msg);
    };
  };

  render() {
    return (
      <div>
        <Market data={this.props.data} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ wsData: wsData }, dispatch);
}

function mapStateToProps({ data }) {
  return { data };
}

export default connect(mapStateToProps, mapDispatchToProps)(Price);
// export default Price;
