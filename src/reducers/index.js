import { combineReducers } from 'redux'
import nodes from './node'
import parameters from "./parameter";
import constants from "./constant";
import variables from "./variable";

export default combineReducers({
  variables,
  nodes,
  parameters,
  constants,
})
