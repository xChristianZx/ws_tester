// export default function(state = {}, action) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }

// const reducer = (state = {}, action) => {
//   switch (action.type) {
//     case "WEBSOCKET_MESSAGE":
//       const data = JSON.parse(action.payload.msg.data);
//       console.log("REDUCER HIT");
//       return { ...state, ...data };

//     default:
//       return state;
//   }
// };

// export default reducer;

const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case "WEBSOCKET_DATA":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default dataReducer;
