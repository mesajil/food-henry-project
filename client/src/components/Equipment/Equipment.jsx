import EquipmentItem from '../EquipmentItem/EquipmentItem'

const Equipment = ({ equipment }) => {

    return (<div>
        {equipment && // Render equipment if it exist
            <div>
                <p>Equipment: </p>
                {equipment.map((equipmentItem, index) =>
                    <EquipmentItem key={index} equipmentItem={equipmentItem} />)}
            </div>}
    </div>)
}

export default Equipment;