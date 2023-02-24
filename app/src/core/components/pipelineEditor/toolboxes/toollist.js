import { Collapse } from 'antd';
import React from 'react';
import ToolboxNode from './node';
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const ToolList = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="Inputs" key="1">
        <ToolboxNode type="Input" id="" name="CSV Input"></ToolboxNode>
        <ToolboxNode type="Input" id="" name="JSON Input"></ToolboxNode>
        <ToolboxNode type="Input" id="" name="Database Input"></ToolboxNode>
      </Panel>
      <Panel header="Preprocessing" key="2">
        <ToolboxNode type="Input" id="" name="SimpleImputer"></ToolboxNode>
        <ToolboxNode type="Input" id="" name="Standard Scale"></ToolboxNode>
        <ToolboxNode type="Input" id="" name="Normalize"></ToolboxNode>
      </Panel>
      <Panel header="Models" key="3">
        <ToolboxNode type="Input" id="" name="Randomforest"></ToolboxNode>
        <ToolboxNode type="Input" id="" name="SVC"></ToolboxNode>
      </Panel>
    </Collapse>
  );
};
export default ToolList;