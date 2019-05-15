import { connect } from 'react-redux'
import { applySelectors, bindActionCreators } from '@vslutov/redux-flux'

import { TrackerComponent } from './component'
import { selectors, actions } from './flux'

export const Tracker = connect(applySelectors(selectors), bindActionCreators(actions))(TrackerComponent)
