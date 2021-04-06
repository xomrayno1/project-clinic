import {compose, createStore} from 'redux'
import {applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../redux/reducer/index'
import rootSaga from '../redux/sagas/index'

const sagaMiddleware = createSagaMiddleware();

const store = compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ,
)(createStore)(rootReducer)

sagaMiddleware.run(rootSaga)

export default store;