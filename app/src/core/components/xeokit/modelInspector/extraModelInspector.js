import { Tabs } from 'antd';
const { TabPane } = Tabs;

const ExtraModelInspector = (props) => {
  const className = props.className; //'customPanel IssuesPanel'
  const tabId = props.tabId;
  const tabName = props.tabName;

  return (
    <TabPane tab={tabName} key={tabId} className={className} style={{ height: 'calc(100vh - 68px - 75px)', overflowY: 'auto' }}>
      {props.children}
    </TabPane>
  )
}

export default ExtraModelInspector;