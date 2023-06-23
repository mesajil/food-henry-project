const EquipmentItem = ({equipmentItem}) => {

    return (<div>
        {equipmentItem &&
        <p>{equipmentItem.id}. {equipmentItem.name}</p>}
    </div>)
}

export default EquipmentItem;