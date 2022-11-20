import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReduces";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
});
let initialState = {};
const midleWare = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...midleWare)));

export default store;