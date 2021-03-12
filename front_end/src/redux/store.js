import {createStore,combineReducers,applyMiddleware,compose} from 'redux'

import userreducer from './reducers/userreducer.js'
import datareducer from './reducers/datareducer.js'
import uireducer from './reducers/uireducer.js'

import thunk from 'redux-thunk'
const initialState={};
const middleware=[thunk];

const reducers=combineReducers({
 user:userreducer,
 data:datareducer,
 ui:uireducer
})
const store=createStore(reducers,initialState,compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store