import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "../reducers/index";
import wsMiddleware from "../services/websocket";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    rootReducers,
    {},
    composeEnhancers(applyMiddleware(thunk, wsMiddleware))
  );
}
