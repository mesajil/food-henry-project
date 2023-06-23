import Steps from '../Steps/Steps'


const Instruction = ({ index, instruction }) => {
    return (
        <div>{
            instruction
            &&
            <div>
                <p>Name: {instruction.name ? instruction.name : `Instruction ${index}`}</p>
                {instruction.steps && <Steps steps={instruction.steps} />}
            </div>
        }
        </div>
    )
}


export default Instruction;