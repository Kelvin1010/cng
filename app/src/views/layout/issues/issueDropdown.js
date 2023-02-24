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
  cilList,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import bimClient from '../../../core/connection/bimClient'
import { useCurrentUser } from '../../../core/hooks/ctx.hooks'
import IssueItem from './issueItem'

const IssueDropdown = () => {
  const currentUser = useCurrentUser();
  const [lookChange, setLookChange] = useState({});
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // if (currentUser) {
    //   bimClient.get(`issues?assignedToId=${currentUser.id}`).then(json => { //{ headers: { 'accept': 'text/event-stream' } }
    //     if (json.status === 200) {
    //       const res = json.data.payload;
    //       if (res)
    //         setIssues(res);
    //     }
    //   })
    // }
  }, [lookChange])


  return (
    <CDropdown variant="nav-item" placement='left-start'>
      <CDropdownToggle placement="bottom-start" className="py-0" caret={false} >
        <CIcon icon={cilList} size="lg" onClick={(e) => { setLookChange({}) }} />
        <CBadge className="border border-light p-1" color="danger" position="top-end" shape="rounded-circle">
          {/* {issues.length > 0? issues.length: ''} */}
          {issues.length > 0 && <span className="visually-hidden">New alerts</span>}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-start" style={{width: '190px', maxHeight: '75vh', overflowX: 'hidden', overflowY: 'auto'}}>
        <CDropdownHeader className="bg-light fw-semibold py-2">{`You have ${issues.length} open Issue(s)`}</CDropdownHeader>
        {issues.map(e => {
          return (
            <IssueItem key={e.id} issue={e}></IssueItem>
          )
        })}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default IssueDropdown
