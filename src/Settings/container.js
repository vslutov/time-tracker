import { connect } from 'react-redux'
import { applySelectors, bindActionCreators } from '@vslutov/redux-flux'

import { SettingsComponent } from './component'
import { selectors, actions } from './flux'

export const Settings = connect(applySelectors(selectors), bindActionCreators(actions))(SettingsComponent)
