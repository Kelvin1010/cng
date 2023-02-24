import { cilBell } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { Space } from "antd";
import { useEffect, useState } from "react";
import bimClient from "../../../core/connection/bimClient";
import { dateToTimeAgo } from "../../../core/utils/dateTimeUtils";
import './messageItem.style.scss';

const MessageItem = ({ mess, onLookNotif }) => {
  const [status, setStatus] = useState(mess.status);
  const _onLookNotif = () => {
    if (mess.status == 0) {
      bimClient.put(`messications`, { id: mess.id, status: 1 }).then((json) => {
        if (json.status === 200) {
          setStatus(true);
          if (onLookNotif)
            onLookNotif(true);
        }
      }
      )
    }
  }

  useEffect(() => {
    if (mess) {
      setStatus(mess.status);
    }
  }, [mess])

  return (
    <div className={status == 0 ? 'unread-mess' : ''} style={{ width: '230px', marginLeft: '5px', marginRight: '2px' }}>
      <Space>
        <CIcon icon={cilBell} size="lg" />
        <Space>
          <div style={{ display: 'flex', flexFlow: 'column' }} onClick={_onLookNotif}>
            <a>
              {mess.description}
            </a>
            <a style={{ fontSize: '0.8em', color: 'Highlight' }}>
              {dateToTimeAgo(mess.createdAt)}
            </a>
          </div>
        </Space>
      </Space>
    </div>
  )
}

export default MessageItem;