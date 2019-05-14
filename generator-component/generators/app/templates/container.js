import { connect } from 'react-redux'
import { applySelectors, bindActionCreators } from '@vslutov/redux-flux'

import { <%= upperComponent %>Component } from './component'
import { selectors, actions } from './flux'

export <%= upperComponent %> = connect(applySelectors(selectors), bindActionCreators(actions))(<%= upperComponent %>Component)
