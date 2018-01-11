// import { WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT } from "../actions/types";

// let websocket;

// const wsMiddleware = store => next => action => {
//   switch (action.type) {
//     case WEBSOCKET_CONNECT:
//       websocket = new WebSocket(action.payload.uri);

//       websocket.onopen = () => {
//         return dispatch({ type: "WEBSOCKET_OPEN" });
//       };
//       websocket.onclose = event => {
//         return dispatch({ type: "WEBSOCKET_CLOSE", payload: event });
//       };
//       websocket.onmessage = event => {
//         return dispatch({ type: "WEBSOCKET_MESSAGE", payload: event });
//       };
//       break;

//     default:
//       break;
//   }
//   return next(action);
// };

// export default wsMiddleware;
