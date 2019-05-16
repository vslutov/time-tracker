import React, { useState } from 'react'
import { Navbar, Container, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap'
import { Link, NavLink } from 'react-router-dom'

export const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return pug`
    Navbar(color="light",light,expand="md")
      Container
        Link.navbar-brand(to=process.env.PUBLIC_URL + "/") Time tracker

        NavbarToggler(onClick=toggle)

        Collapse(isOpen=isOpen navbar)
          Nav(navbar): NavItem
            NavLink.nav-link(to=(process.env.PUBLIC_URL + "/settings")) Settings
  `
}
