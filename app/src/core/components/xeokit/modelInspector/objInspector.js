import { Collapse } from 'antd';
import React from 'react';
import { Descriptions } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PropertyGrid from '../../propertyGrid';

import './objInspector.style.scss';
import Property from '../../propertyGrid/property';
import { useTranslation } from 'react-i18next';

const { Panel } = Collapse;

const genExtra = () => (
  <PlusCircleOutlined
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
    style={{ color: 'green', fontSize: 16 }}
  />
);

const ObjInspector = ({ metaObj }) => {
  const onChange = (key) => {
    // console.log(key);
  };
  const {t} = useTranslation();
  return (
    <>
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header={t("Identification")} key="1" className='customPanel'>
          {metaObj ?
            <>
              <Property property={{ name: 'Model', value: metaObj ? (metaObj.modelID != null ? metaObj.modelID: metaObj.metaModel.id) : '' }}></Property>
              <Property property={{ name: 'Id', value: metaObj ? metaObj.externalId ? metaObj.externalId : metaObj.id : '' }}></Property>
              <Property property={{ name: 'Name', value: metaObj ? metaObj.Name ? metaObj.Name.value : metaObj.name : '' }}></Property>
              <Property property={{ name: 'Type', value: metaObj ? metaObj.ObjectType ? metaObj.ObjectType.value: metaObj.type : '' }}></Property>
            </>
            : ''}
        </Panel>
        {/* <Panel header="Issues" key="2" className='customPanel IssuesPanel' extra={genExtra()}>
          <ObjIssues></ObjIssues>
        </Panel> */}
        <Panel header={t("Properties")} key="3" className='customPanel'>
          {metaObj ? <PropertyGrid PropertySets={metaObj.propertySets || metaObj.psets}></PropertyGrid> : ''}
        </Panel>
      </Collapse>

    </>
  )
}

export default ObjInspector;