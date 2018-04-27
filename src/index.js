import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import rootReducer from './redux/reducers';
import rootSagas from './redux/sagas';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSagas)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
