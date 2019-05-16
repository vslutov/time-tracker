import React from 'react'
import { Row, Col } from 'reactstrap'

import { InputPassword, InputText, FormGroup, Form } from '../Form'

import { issueUrlRegexp, getIssueTitle, ValidationError } from './helpers'

const validateIssueUrl = (url) => {
  const result = url.match(issueUrlRegexp)
  if (result == null) {
    return "It isn't a valid issue url."
  }
}

const getTitleAndSave = saveSettings => async ({ issueUrl, token }) => {
  try {
    const issueTitle = await getIssueTitle({ issueUrl, token })
    await saveSettings({ issueUrl, token, issueTitle })
  } catch (error) {
    if (error instanceof ValidationError) {
      return error
    }
    throw error
  }
}

export const SettingsComponent = ({ issueUrl, token, saveSettings, issueTitle }) => {
  const initialValues = {
    issueUrl,
    token
  }

  return pug`
    Row.mb-3
      Col(sm=2) Current issue
      Col(sm=10)= issueTitle

    Form(onSubmit=getTitleAndSave(saveSettings) initialValues=initialValues submitText="Save")
      FormGroup(label="Gitlab token" component=InputPassword name="token")

      FormGroup(label="Gitlab issue url" component=InputText name="issueUrl" validate=validateIssueUrl)
  `
}
