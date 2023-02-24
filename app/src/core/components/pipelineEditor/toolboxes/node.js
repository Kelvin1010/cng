const ToolboxNode = ({ type, id, name }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        <img src="icons8-csv-file-64.png"/>
        <div style={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          width:'100%',
          marginLeft: 8,
        }}>
          {name}
        </div>
      </div>
    </>
  )
}

export default ToolboxNode;