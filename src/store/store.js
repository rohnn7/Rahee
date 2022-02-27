import reducer from "./reducer/reducer";
import thunk from "redux-thunk";
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'

const rootReducer = combineReducers({
    main: reducer
})

export const configureStore=(preloadedState = {})=>{
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk)
    )
}