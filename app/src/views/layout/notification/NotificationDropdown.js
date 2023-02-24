import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilTerminal,
  cilApps,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import bimClient from '../../../core/connection/bimClient'
import { useCurrentUser } from '../../../core/hooks/ctx.hooks'
import NotificationItem from './notificationItem'

const NotificationDropdown = () => {
  const currentUser = useCurrentUser();
  const [lookChange, setLookChange] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // if (currentUser) {
    //   bimClient.get(`notifications`).then(json => { //{ headers: { 'accept': 'text/event-stream' } }
    //     if (json.status === 200) {
    //       const res = json.data.payload;
    //       if (res)
    //         setNotifications(res);
    //     }
    //   })
    // }
  }, [lookChange])



  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false} >
        <CIcon icon={cilBell} size="lg" onClick={(e) => { setLookChange({}) }} />
        <CBadge className="border border-light p-1" color="danger" position="top-end" shape="rounded-circle">
          {/* {notifications.length > 0? notifications.length: ''} */}
          {notifications.length > 0 && <span className="visually-hidden">New alerts</span>}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">{`You have ${notifications.length} notification(s)`}</CDropdownHeader>
        {notifications.map(e => {
          return (
            <NotificationItem onLookNotif={() => { setLookChange({}) }} key={e.id} notif={e}></NotificationItem>
          )
        })}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default NotificationDropdown
