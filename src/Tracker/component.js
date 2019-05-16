import React, { useState } from 'react'
import { CaretRight, Checkmark, Reload, ArrowLeft, Close } from '@vslutov/react-bytesize-icons'
import { Button, Row, Col, FormGroup as BSFormGroup } from 'reactstrap'

import { InputTextarea, FormGroup, Form, OnBlur } from '../Form'

export const TrackerComponent = ({ startWork, startTime, message, setMessage, completeWork, completeTime, reset, continueWork, editedMessage, setEditedMessage }) => {
  const [resetConfirming, setResetConfirming] = useState(false)
  const beginReset = () => setResetConfirming(true)

  if (resetConfirming) {
    const cancelReset = () => setResetConfirming(false)
    const confirmReset = () => {
      reset()
      setResetConfirming(false)
    }

    return pug`
      Row
        Col
          p Are you sure want reset progress? This action cannot be undone.

      Row
        Col
          Button(outline color="secondary" onClick=cancelReset)
            Close(width=24 height=24)
            |  Cancel

          Button(outline color="danger" onClick=confirmReset).ml-2
            Checkmark(width=24 height=24)
            |  Reset progress
    `
  }

  if (startTime == null) {
    return pug`
      Row
        Col
          Button(outline color="primary" onClick=startWork)
            CaretRight(width=24 height=24)
            |  Start work session
    `
  }

  if (completeTime != null) {
    const initialValues = {
      editedMessage
    }

    const submit = () => null

    return pug`
      Form(onSubmit=submit initialValues=initialValues)
        FormGroup(label="Edit message, if needed" component=InputTextarea name="editedMessage")

        OnBlur(name="editedMessage" render=setEditedMessage)

        BSFormGroup(row)
          Col(sm={ size: 10, offset: 2 })
            Button(color="primary" outline type="submit")
              Checkmark(width=24 height=24)
              | Commit workday

            Button(color="secondary" outline onClick=continueWork).ml-2
              ArrowLeft(width=24 height=24)
              | Continue work

            Button(color="danger" outline onClick=beginReset).ml-2
              Reload(width=24 height=24)
              | Reset progress
    `
  }

  const initialValues = {
    message
  }

  return pug`
    Form(onSubmit=completeWork initialValues=initialValues)
      FormGroup(label="Write there the tasks, which you have done by the day" component=InputTextarea name="message")

      OnBlur(name="message" render=setMessage)

      BSFormGroup(row)
        Col(sm={ size: 10, offset: 2 })
          Button(color="primary" outline type="submit")
            Checkmark(width=24 height=24)
            |  Finish workday

          Button(color="danger" outline onClick=beginReset).ml-2
            Reload(width=24 height=24)
            |  Reset progress
  `
}
