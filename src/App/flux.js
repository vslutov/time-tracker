import { createStore as createReduxStore, applyMiddleware, compose, combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { routerMiddleware } from '@vslutov/router-middleware'
import { batch, batching } from 'redux-batch-middleware'
import persistState from 'redux-localstorage'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import { trackerReducer } from '../Tracker/flux'
import { settingsReducer } from '../Settings/flux'

import { trackerEpic } from '../Tracker/epics'

const rootEpic = combineEpics(
  trackerEpic
)

const createRootReducer = history => batching(combineReducers({
  router: connectRouter(history),
  tracker: trackerReducer,
  settings: settingsReducer
}))

const composeEnhancers = (window != null && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const createStore = ({ history, preloadedState }) => {
  const epicMiddleware = createEpicMiddleware()

  const reduxMiddlewares = composeEnhancers(
    persistState(),
    applyMiddleware(
      epicMiddleware,
      batch,
      routerMiddleware(history)
    )
  )

  const rootReducer = createRootReducer(history)

  const store = (() => {
    if (preloadedState != null) {
      return createReduxStore(rootReducer, preloadedState, reduxMiddlewares)
    } else {
      return createReduxStore(rootReducer, reduxMiddlewares)
    }
  })()

  epicMiddleware.run(rootEpic)

  return store
}
