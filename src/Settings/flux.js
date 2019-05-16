import { createFlux } from '@vslutov/redux-flux'
import { createSelector } from 'reselect'

import { getIssueInfo } from './helpers'

const { setActions, settingsReducer, defaultSelectors } = createFlux({
  prefix: 'SETTINGS',
  defaultValues: {
    issueUrl: '',
    token: '',
    issueTitle: ''
  }
})

export const actions = {
  ...setActions,
  saveSettings: async ({ issueUrl, token, issueTitle }) => {
    return [
      setActions.setIssueUrl(issueUrl),
      setActions.setToken(token),
      setActions.setIssueTitle(issueTitle)
    ]
  }
}
export const selectors = {
  ...defaultSelectors,
  issueInfo: createSelector(defaultSelectors.issueUrl, getIssueInfo)
}

export { settingsReducer }
