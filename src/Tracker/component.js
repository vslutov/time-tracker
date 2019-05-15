import React, { useState } from 'react'
import { CaretRight, Checkmark, Reload } from '@vslutov/react-bytesize-icons'
import { Button, Row, Col, Input, Form as BSForm, FormGroup, Label, Alert } from 'reactstrap'
import { Form, Field } from 'react-final-form'

const Textarea = ({ input, meta }) => (
  <Input type='textarea' id={input.name} {...input} />
)

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

const OnBlur = ({ name, render }) => {
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

const DescriptionForm = ({ onSubmit, initialValues, setMessage }) => {
  const DescriptionFormComponent = ({ handleSubmit, pristine, invalid }) => (
    pug`
      BSForm(onSubmit=handleSubmit)
        FormGroup
          Label(for="message") Write there the tasks, which you do by day

          Field(name="message" component=Textarea)

          OnBlur(name="message" render=setMessage)

        Button(color="primary" type="submit" disabled=invalid)
          Checkmark(width=24 height=24)
          |  Submit
    `
  )

  return pug`Form(onSubmit=onSubmit initialValues=initialValues render=DescriptionFormComponent keepDirtyOnReinitialize)`
}

const getDate = ts => {
  const year = ts.getFullYear()
  const month = `${Math.floor(ts.getMonth() / 10)}${ts.getMonth() % 10}`
  const date = `${Math.floor(ts.getDate() / 10)}${ts.getDate() % 10}`
  return `${year}-${month}-${date}`
}

export const TrackerComponent = ({ startWork, startTime, message, setMessage, completeWork, completeTime, reset }) => {
  const initialValues = {
    message
  }

  if (startTime == null) {
    return pug`
      Row
        Col
          Button(color="primary" onClick=startWork)
            CaretRight(width=24 height=24)
            |  Start work session
    `
  } else if (completeTime != null) {
    const preSpentMinutes = Math.ceil((completeTime - startTime) / (60 * 1000))
    const spentHours = Math.floor(preSpentMinutes / 60)
    const spentMinutes = preSpentMinutes - 60 * spentHours

    const startDay = getDate(new Date(startTime))

    return pug`
      p Copy this text to gitlab issue comment

      Alert(color="secondary" fade=false)
        pre
          code
            = message + '\n'
            = '/spend ' + spentHours + 'h' + spentMinutes + 'm ' + startDay

      Button(onClick=reset color="primary")
        Reload(width=24 height=24)
        |  Reset
    `
  } else {
    return pug`
      DescriptionForm(onSubmit=completeWork initialValues=initialValues setMessage=setMessage)
    `
  }
}
