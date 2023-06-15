
import './steps.less'
import { Steps } from "./steps"
import { Step } from "./step"
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'


export type { StepsProps } from "./steps"
export type { StepProps }  from "./step"

export default attachPropertiesToComponent(Steps, {
    Step
});