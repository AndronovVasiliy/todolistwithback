import { applyMiddleware, combineReducers, createStore } from "redux";
import { reduserAuthMe } from "../reducers/reduserAuthMe";
import { reduserToDoList } from "../reducers/reduserToDoList";
import thunk from "redux-thunk";

const reducers = combineReducers({
    auth: reduserAuthMe,
    toDoLists: reduserToDoList
})

type RootReducer = typeof reducers

export type RootState = ReturnType<RootReducer>

const store = createStore(reducers, applyMiddleware(thunk))

export default store