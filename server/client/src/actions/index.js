// eslint-disable-next-line
import { FETCH_DATA, WEBSOCKET_CONNECT, WEBSOCKET_DATA } from "./types";
// const uri = "ws://localhost:8000";

export const websocketConnecting = (uri = "ws://localhost:8000") => {
  return {
    type: WEBSOCKET_CONNECT,
    payload: uri
  };
};

const wsData = data => {
  return {
    type: WEBSOCKET_DATA,
    data
  };
};

export default wsData;
