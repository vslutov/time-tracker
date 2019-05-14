import React from 'react'
import { HeadProvider } from 'react-head'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { AppComponent } from './component'

export const App = ({ store, history }) => pug`
  HeadProvider
    Provider(store=store)
      ConnectedRouter(history=history)
        AppComponent
`
