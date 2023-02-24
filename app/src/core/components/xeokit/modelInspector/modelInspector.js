import { Tabs } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ObjInspector from './objInspector';
// import { PlusCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

function callback(key) {
  // console.log(key);
}

const ModelInspector = ({ children, metaObj, visible }) => {
  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { metaObj });
    }
    return child;
  });

  const {t} = useTranslation();

  return (
    <div style={
      {
        position: 'fixed',
        paddingLeft: 5, right: 0, top: 64,
        width: '350px',
        height: 'calc(100vh - 64px)',
        backgroundColor: 'rgb(250, 250, 250)',  //'#f0f0f0', 
        // borderLeft: '1px solid lightgray',
        // borderBottom: '1px solid lightgray',
        zIndex: 1000,
        overflow: 'hidden',
        visibility: visible? 'visible': 'hidden'
      }}>
      <Tabs defaultActiveKey="1" onChange={callback} size={'large'}>
        <TabPane tab={t("Inspect")} key="0" style={{ height: 'calc(100vh - 68px - 75px)', overflowY: 'auto' }}>
          <ObjInspector metaObj={metaObj}></ObjInspector>
        </TabPane>
        {children}
      </Tabs>
    </div>
  )
}

export default ModelInspector;