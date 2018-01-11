import React, { Component } from "react";
import "./App.css";
import Price from "./containers/Price";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

// const store = configureStore();

class App extends Component {
  render() {
    return <Price />;
  }
}

export default App;
