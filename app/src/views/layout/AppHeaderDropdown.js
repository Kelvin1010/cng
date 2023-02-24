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

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useSelector } from 'react-redux'
import bimClient from '../../core/connection/bimClient'
import { useCurrentUser } from '../../core/hooks/ctx.hooks'

const AppHeaderDropdown = () => {
  const currentUser = useCurrentUser();
  const [avata, setAvatar] = useState();
  const [isAdminPage, setIsAdminPage] = useState(false);

  const location = window.location.href;

  useEffect(() => {
    if (location.includes('#/admin/'))
      setIsAdminPage(true);
    else
      setIsAdminPage(false);
  }, [location])

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={'https://joeschmoe.io/api/v1/random'} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#/account/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#/account/security">
          <CIcon icon={cilUser} className="me-2" />
          Change password
        </CDropdownItem>
        <CDropdownDivider />
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>  */}
        {!isAdminPage && currentUser.isAdmin && <CDropdownItem href="#/admin">
          <CIcon icon={cilTerminal} className="me-2" />
          Admin
        </CDropdownItem>}

        {isAdminPage && <CDropdownItem href="#">
          <CIcon icon={cilApps} className="me-2" />
          Back to App
        </CDropdownItem>}

        <CDropdownItem href="#/auth/login">
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
