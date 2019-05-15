import { createFlux } from '@vslutov/redux-flux'

const { setActions, <%= lowerComponent %>Reducer, defaultSelectors } = createFlux({
  prefix: '<%= snakeComponent %>',
  defaultValues: {
  }
})

export { setActions as actions }
export { defaultSelectors as selectors }
export { <%= lowerComponent %>Reducer }
