import { createStore as createReduxStore, applyMiddleware, compose, combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { routerMiddleware } from '@vslutov/router-middleware'
import { batch, batching } from 'redux-batch-middleware'

const createRootReducer = history => batching(combineReducers({
  router: connectRouter(history)
}))

const composeEnhancers = (window != null && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const createStore = ({ history, preloadedState }) => {
  const reduxMiddlewares = composeEnhancers(
    applyMiddleware(batch, routerMiddleware(history))
  )

  const rootReducer = createRootReducer(history)

  if (preloadedState != null) {
    return createReduxStore(rootReducer, preloadedState, reduxMiddlewares)
  } else {
    return createReduxStore(rootReducer, reduxMiddlewares)
  }
}
