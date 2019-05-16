import React, { useState, Fragment } from 'react'
import { Input, Alert, FormGroup as BSFormGroup, Label, Col, Form as BSForm, Button } from 'reactstrap'
import { Field, Form as FinalForm } from 'react-final-form'
import { Checkmark } from '@vslutov/react-bytesize-icons'

import styles from './Form.module.css'

const InputHelper = ({ type = 'text', className = '' }) => ({ input, meta }) => (
  <Fragment>
    <Input type={type} id={input.name} {...input} className={className} />
    {meta.touched && meta.error && <Alert color='danger'>{meta.error}</Alert>}
    {!meta.dirtySinceLastSubmit && meta.submitError && <Alert color='danger'>{meta.submitError}</Alert>}
  </Fragment>
)

export const InputText = InputHelper({ type: 'text' })
export const InputPassword = InputHelper({ type: 'password' })
export const InputTextarea = InputHelper({ type: 'textarea', className: styles.textarea })

export const FormGroup = ({ label, component, name, validate }) => pug`
  BSFormGroup(row)
    Label(for=name sm=2)= label

    Col(sm=10)
      Field(name=name component=component validate=validate)
`

export const Form = ({ onSubmit, initialValues, children, submitText = '', allowPristine = false }) => {
  const FormComponent = ({ handleSubmit, errors, pristine, ...args }) => {
    const invalid = Object.keys(errors).length > 0
    const disabled = invalid || (pristine && !allowPristine)

    return pug`
      BSForm(onSubmit=handleSubmit)
        = children

        if submitText.length > 0
          BSFormGroup(row)
            Col(sm={ size: 10, offset: 2 })
              Button(outline color="primary" type="submit" disabled=disabled)
                Checkmark(width=24 height=24)
                = ' ' + submitText
    `
  }

  return pug`
    FinalForm(onSubmit=onSubmit initialValues=initialValues render=FormComponent)
  `
}

const OnBlurState = ({ meta: { active }, input, render }) => {
  const [previous, setPrevious] = useState(active)

  if (previous && !active) {
    render(input.value)
  }

  if (previous !== active) {
    setPrevious(active)
  }

  return null
}

export const OnBlur = ({ name, render }) => {
  const compile = props => {
    return <OnBlurState {...props} render={render} />
  }

  const subscription = {
    active: true,
    value: true
  }

  return pug`
    Field(name=name subscription=subscription render=compile)
  `
}
