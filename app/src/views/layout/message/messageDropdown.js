import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilEnvelopeClosed,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import bimClient from '../../../core/connection/bimClient'
import { useCurrentUser } from '../../../core/hooks/ctx.hooks'
import MessageItem from './messageItem'

const MessageDropdown = () => {
  const currentUser = useCurrentUser();
  const [lookChange, setLookChange] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // if (currentUser) {
    //   bimClient.get(`messages`).then(json => { //{ headers: { 'accept': 'text/event-stream' } }
    //     if (json.status === 200) {
    //       const res = json.data.payload;
    //       if (res)
    //         setMessages(res);
    //     }
    //   })
    // }
  }, [lookChange])



  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false} >
        <CIcon icon={cilEnvelopeClosed} size="lg" onClick={(e) => { setLookChange({}) }} />
        <CBadge className="border border-light p-1" color="danger" position="top-end" shape="rounded-circle">
          {/* {Messages.length > 0? Messages.length: ''} */}
          {messages.length > 0 && <span className="visually-hidden">New alerts</span>}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">{`You have ${messages.length} Message(s)`}</CDropdownHeader>
        {messages.map(e => {
          return (
            <MessageItem onLookNotif={() => { setLookChange({}) }} key={e.id} notif={e}></MessageItem>
          )
        })}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default MessageDropdown
