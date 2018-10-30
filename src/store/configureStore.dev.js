import {applyMiddleware, createStore, compose} from 'redux'
import rootReducer from '../reducers'

import {createLogger} from 'redux-logger'


const configureStore = preloadedState => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                createLogger({
                    level: "info",
                    collapsed: true,
                })
            )
        ),

        // compose(
        //   applyMiddleware(thunk, api, createLogger()),
        //   applyMiddleware(thunk, api, createLogger()),
        //   DevTools.instrument()
        // )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer)
        })
    }

    return store
};

export default configureStore
