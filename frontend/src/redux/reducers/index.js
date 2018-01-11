import { combineReducers } from 'redux';
import auth from './auth';
import register from './register';
import core from './core';


const rootReducer = combineReducers({
    auth,
    register,
    core,
    location: require("./locationReducer").reducer,
});

export default rootReducer;
