import React from 'react'
import { Navbar, NavbarBrand, Container } from 'reactstrap'

export const NavbarComponent = () => (
  pug`
    Navbar(color="light",light,expand="md")
      Container
        NavbarBrand(href=process.env.PUBLIC_URL + "/") Time tracker
  `
)
