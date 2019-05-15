import React from 'react'
import { Container } from 'reactstrap'

import { Navbar } from '../Navbar'
import { Tracker } from '../Tracker'

export const AppComponent = () => (
  pug`
    Navbar
    Container.mt-2
      Tracker
  `
)
