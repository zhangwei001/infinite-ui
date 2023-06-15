import './autoComplete.less'
import  AutoComplete  from './autoComplete'
import Option from '../dropdown/option'
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'
 
export type { DropdownItemProps} from '../dropdown/option'
export type { AutoCompleteProps } from './autoComplete'
 
export default attachPropertiesToComponent(AutoComplete, {
  Option,
})