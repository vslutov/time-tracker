import { createFlux } from '@vslutov/redux-flux'

const { setActions, trackerReducer, defaultSelectors } = createFlux({
  prefix: 'TRACKER',
  defaultValues: {
    startTime: null,
    completeTime: null,
    message: '',
    editedMessage: ''
  }
})

export const actions = {
  ...setActions,
  startWork: () => (
    setActions.setStartTime(+new Date())
  ),
  completeWork: () => (
    setActions.setCompleteTime(+new Date())
  ),
  continueWork: () => (
    setActions.setCompleteTime(null)
  ),
  reset: () => ([
    setActions.setStartTime(null),
    setActions.setCompleteTime(null),
    setActions.setMessage(''),
    setActions.setEditedMessage('')
  ])
}
export { defaultSelectors as selectors }
export { trackerReducer }
