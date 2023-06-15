import './dropdown.less'
import  Dropdown  from './dropdown'
import Option from './option'
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'
 
export type { DropdownItemProps} from './option'
export type { DropdownProps } from './dropdown'
 
export default attachPropertiesToComponent(Dropdown, {
  Option,
})