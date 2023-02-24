import { cilBell } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { Space } from "antd";
import { useEffect, useState } from "react";
import bimClient from "../../../core/connection/bimClient";
import { dateToTimeAgo } from "../../../core/utils/dateTimeUtils";
import './issueItem.style.scss';

const IssueItem = ({ issue }) => {

  return (
    issue && <div className={issue.status == 0 ? 'open-issue' : ''} 
    style={{ width: '180px', marginLeft: '8px', marginRight: '5px' }}>
      <Space>
        {/* <CIcon icon={cilBell} size="lg" /> */}
        <Space>
          <div style={{ display: 'flex', flexFlow: 'column' }} >
            <a>
              {issue.title}
            </a>
            <a>
              {issue.descp}
            </a>
            <a style={{ fontSize: '0.8em', color: 'Highlight' }}>
              {dateToTimeAgo(issue.createdAt)}
            </a>
          </div>
        </Space>
      </Space>
    </div>
  )
}

export default IssueItem;