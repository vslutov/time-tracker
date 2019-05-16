import React from 'react'
import { Container } from 'reactstrap'
import { Switch, Route } from 'react-router'

import { Navbar } from '../Navbar'
import { Tracker } from '../Tracker'
import { Settings } from '../Settings'

export const AppComponent = () => (
  pug`
    Navbar
    Container.mt-3
      Switch
        Route(path=(process.env.PUBLIC_URL + "/settings") component=Settings)
        Route(component=Tracker)
  `
)
