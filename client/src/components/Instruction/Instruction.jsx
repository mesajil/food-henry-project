import Steps from '../Steps/Steps'
import { isEmptyArray } from '../../utils/utils'


const Instruction = ({ index, instruction }) => {
    return (
        <div>{
            instruction &&
            <div>
                <p>{`Instruction ${index + 1}`}: {instruction?.name}
                </p>
                {!isEmptyArray(instruction.steps) &&
                    <Steps steps={instruction.steps} />}
            </div>
        }
        </div>
    )
}


export default Instruction;