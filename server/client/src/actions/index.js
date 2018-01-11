// eslint-disable
import { FETCH_DATA, WEBSOCKET_CONNECT } from "./types";
const uri = "ws://localhost:8000";
// const websocket;

export const websocketConnecting = (uri = "ws://localhost:8000") => {
  return {
    type: WEBSOCKET_CONNECT,
    payload: uri
  };
};

export const fetchData = () => {
  return function(dispatch) {
    //WS logic should go here
  };
};
