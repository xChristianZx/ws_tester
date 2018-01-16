import React, { Component } from "react";
import Market from "../components/Market";
import { connect } from "react-redux";
import wsData from "../actions/index";
import { bindActionCreators } from "redux";

class Price extends Component {
  componentDidMount() {
    this.wsSetup();
  }

  wsSetup = () => {
    const socket = new WebSocket("ws://localhost:8000");
    console.log("Here I am", socket.readyState);

    socket.onopen = msg => {
      console.log("Websocket state:", msg.type);
      socket.send("Client connected");
    };

    socket.onmessage = msg => {
      // console.log(msg);
      const data = JSON.parse(msg.data);
      if (data.type === "message") {
        console.log(data);
      }
      if (data.type === "ticker") {
        console.log(data);
        this.props.wsData(data);
      }
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
