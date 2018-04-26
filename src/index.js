import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './App';
import rootReducer from './redux/reducers';
import registerServiceWorker from './registerServiceWorker';
import { taskSagas } from './redux/sagas/task';

import 'bootstrap/dist/css/bootstrap.min.css';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(taskSagas)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
