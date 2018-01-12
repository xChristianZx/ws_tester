const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case "WEBSOCKET_DATA":
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default dataReducer;
