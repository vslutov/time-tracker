import { createFlux } from '@vslutov/redux-flux'

const { setActions, trackerReducer, defaultSelectors } = createFlux({
  prefix: 'TRACKER',
  defaultValues: {
    startTime: null,
    completeTime: null,
    message: ''
  }
})

export const actions = {
  ...setActions,
  startWork: () => (
    setActions.setStartTime(+new Date())
  ),
  completeWork: (event) => (
    setActions.setCompleteTime(+new Date())
  ),
  reset: () => ([
    setActions.setStartTime(null),
    setActions.setCompleteTime(null),
    setActions.setMessage('')
  ])
}
export { defaultSelectors as selectors }
export { trackerReducer }
