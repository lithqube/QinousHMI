import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as actions from "./Actions";

const store = createStore(actions.reducer, applyMiddleware(thunk));
export default store;