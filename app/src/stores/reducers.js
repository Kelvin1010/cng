import { combineReducers } from "redux";
import layout from '../views/layout/store';
import auth from "../views/Auth/stores/authSlice";
// import features from '../config/features.json';

var reducers = {}

reducers["layout"] = layout;
reducers['auth'] = auth;

export default combineReducers(reducers);
