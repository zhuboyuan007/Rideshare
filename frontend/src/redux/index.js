import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk,logger)
);

export default store;