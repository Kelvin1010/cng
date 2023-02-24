import React from 'react';
import 'reactflow/dist/style.css';
import './toolboxes.style.scss';
import ToolList from './toollist';

const ToolBoxes = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    // <aside>
    //   {/* <div className="description">You can drag these nodes to the pane on the right.</div> */}
    //   <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
    //     Input Node
    //   </div>
    //   <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
    //     SimpleImputer
    //   </div>
    //   <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
    //     SVC Classifier
    //   </div>
    // </aside>
    <ToolList></ToolList>  
    );
};

export default ToolBoxes;