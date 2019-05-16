import { ofType } from '@vslutov/of-type'
import { map } from 'rxjs/operators'

import { actions, selectors } from './flux'

const getDate = ts => {
  const year = ts.getFullYear()
  const month = `${Math.floor(ts.getMonth() / 10)}${ts.getMonth() % 10}`
  const date = `${Math.floor(ts.getDate() / 10)}${ts.getDate() % 10}`
  return `${year}-${month}-${date}`
}

export const trackerEpic = (action$, state$) => action$.pipe(
  ofType(actions.setCompleteTime),
  map(({ payload: completeTime }) => {
    const startTime = selectors.startTime(state$.value)
    const message = selectors.message(state$.value)

    const preSpentMinutes = Math.ceil((completeTime - startTime) / (10 * 60 * 1000)) * 10
    const spentHours = Math.floor(preSpentMinutes / 60)
    const spentMinutes = preSpentMinutes - 60 * spentHours

    const startDay = getDate(new Date(startTime))

    const editedMessage = `${message}\n/spend ${spentHours}h${spentMinutes}m ${startDay}`

    return actions.setEditedMessage(editedMessage)
  })
)
