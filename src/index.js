import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'

import 'bootstrap/dist/css/bootstrap.min.css'

import { App } from './App'
import { createStore } from './App/flux'
import { register } from './serviceWorker'

const history = createBrowserHistory()
const store = createStore({ history })

ReactDOM.render(pug`App(history=history, store=store)`, document.getElementById('root'))

// Learn more about service workers: https://bit.ly/CRA-PWA
register()
