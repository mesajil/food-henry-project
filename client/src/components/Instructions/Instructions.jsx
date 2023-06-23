import Instruction from '../Instruction/Instruction'


const Instructions = ({ instructions }) => {

    return (
        <div>
            <h5>Instructions</h5>
            {instructions
                ? <div>{instructions
                    .map((instruction, index) =>
                        <Instruction
                            key={index} index={index}
                            instruction={instruction} />)}
                </div>
                : <p>No instructions found</p>
            }
        </div>
    )
}


export default Instructions;