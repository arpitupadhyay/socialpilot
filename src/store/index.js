import { createStore } from "redux";

function form(
  state = {
    address: "",
    bedroom: "",
    bathroom: "",
    description: "",
  },
  action
) {
  switch (action.type) {
    case "SAVE_FORM":
      return {
        ...state,
        ...action.payload,
      }; //state.concat([action.text])
    case "CLEAR_FORM":
      return {
        address: "",
        bedroom: "",
        bathroom: "",
        description: "",
      };
    default:
      return state;
  }
}

const store = createStore(form, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;

// store.dispatch({
//   type: "SAVE_FORM",
//   text: "Read the docs",
// });

// console.log(store.getState());
// [ 'Use Redux', 'Read the docs' ]
