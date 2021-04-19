import { combineReducers } from "redux";
import task from "./task";
import toggleForm from "./toggleForm";
import editingItem from "./editingItem";

const myReducers = combineReducers({
  task,
  toggleForm,
  editingItem,
})

export default myReducers;
