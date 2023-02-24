import { cilBell } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { Space } from "antd";
import { useEffect, useState } from "react";
import bimClient from "../../../core/connection/bimClient";
import { dateToTimeAgo } from "../../../core/utils/dateTimeUtils";
import './notificationItem.style.scss';

const NotificationItem = ({ notif, onLookNotif }) => {
  const [status, setStatus] = useState(notif.status);
  const _onLookNotif = () => {
    if (notif.status == 0) {
      bimClient.put(`notifications`, { id: notif.id, status: 1 }).then((json) => {
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
    if (notif) {
      setStatus(notif.status);
    }
  }, [notif])

  return (
    <div className={status == 0 ? 'unlook-notif' : ''} style={{ width: '230px', marginLeft: '5px', marginRight: '2px' }}>
      <Space>
        <CIcon icon={cilBell} size="lg" />
        <Space>
          <div style={{ display: 'flex', flexFlow: 'column' }} onClick={_onLookNotif}>
            <a>
              {notif.description}
            </a>
            <a style={{ fontSize: '0.8em', color: 'Highlight' }}>
              {dateToTimeAgo(notif.createdAt)}
            </a>
          </div>
        </Space>
      </Space>
    </div>
  )
}

export default NotificationItem;