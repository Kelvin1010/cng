import Icon, { FilePdfOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import React from 'react';
import { isHTML } from '../utils/strUtils';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ZList = ({ data, pageSize, onResourceClick }) => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={
      pageSize ? {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: pageSize,
      } : null
    }
    dataSource={data}
    footer={
      <div>
        {/* <b>ant design</b> footer part */}
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.key}
        actions={[
          //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
      // extra={
      //   <img
      //     width={272}
      //     alt="logo"
      //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      //   />
      // }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        <Space>
          {isHTML(item.content) ? <div dangerouslySetInnerHTML={{
            __html: item.content
          }}></div> : item.content}

          {item.resourceLink ? 
          <a onClick={() => 
          { if (onResourceClick) onResourceClick(item) }}>
            <Icon 
            component={FilePdfOutlined}
            style={{color: 'green'}}
            >
              </Icon></a>: ''}
        </Space>
        
      </List.Item>
    )}
  />
);

export default ZList;