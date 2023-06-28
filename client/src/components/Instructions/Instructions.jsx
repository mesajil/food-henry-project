import Instruction from '../Instruction/Instruction'
import { isEmptyArray } from '../../utils/utils'
import style from './Instructions.module.css'

const Instructions = ({ instructions }) => {

    return (
        <div>
            {!isEmptyArray(instructions) ?
                <div className={style.container}>
                    <h5>Instructions</h5>
                    {instructions.map((instruction, index) =>
                        <Instruction key={index} index={index}
                            instruction={instruction}
                        />)}
                </div>
                : <p>No instructions found</p>
            }
        </div>
    )
}


export default Instructions;