import './select.less'
import  Select  from './select'
import Option from '../dropdown/option'
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'
 
export type { DropdownItemProps} from '../dropdown/option'
export type { SelectProps } from './select'
 
// export default RefSelect
 
 
export default attachPropertiesToComponent(Select, {
  Option,
})