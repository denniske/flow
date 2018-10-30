import { combineReducers } from 'redux'
import nodes from './node'
import parameters from "./parameter";
import constants from "./constant";

export default combineReducers({
  nodes,
  parameters,
  constants,
})
