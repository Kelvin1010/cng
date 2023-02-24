import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarVisible } from './store';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CNavbarNav,
  CCollapse,
  CDropdownDivider,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons';

import { AppBreadcrumb } from './index';
import { AppHeaderDropdown } from './index';
import { logo } from '../../assets/brand/logo';
import DynamicSubHeader from './dynamicSubHeader';
import bimClient from '../../core/connection/bimClient';
import { useCurrentProject, useCurrentUser } from '../../core/hooks/ctx.hooks';
import bimEventSource from '../../core/connection/bimEventSource';
import NotificationDropdown from './notification/NotificationDropdown';
import MessageDropdown from './message/messageDropdown';
import IssueDropdown from './issues/issueDropdown';

const AppHeader = (props) => {
  const forAdmin = props.forAdmin === true ? true : false;
  const canToggleSideBar = props.canToggleSideBar
    ? props.canToggleSideBar === 'true'
    : true;

  const _canToggleSideBar = useSelector(
    (state) => state.layout.canToggleSidebar
  );
  // console.log(_canToggleSideBar);

  const _showBreadcrumb = props.showBreadcrumb
    ? props.showBreadcrumb === 'true'
    : true;

  const showBreadcrumb = _showBreadcrumb && _canToggleSideBar;

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.layout.sidebarShow);

  const drawBreadcrumb = useMemo(() => {
    return (
      <>
        <CHeaderDivider style={{ marginTop: '3px', marginBottom: '3px' }} />
        <CContainer fluid>
          <AppBreadcrumb forAdmin={forAdmin} />
        </CContainer>
      </>
    );
  }, [showBreadcrumb]);

  const currentUser = useCurrentUser();

  return (
    <CHeader position="sticky" className="mb-2">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          style={{
            visibility: canToggleSideBar ? 'visible' : 'hidden',
            paddingLeft: 2,
          }}
          onClick={() =>
            _canToggleSideBar ? dispatch(setSidebarVisible(!sidebarShow)) : ''
          }
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={32} alt="Logo" /> */}
          <img src="/VPI_logo.png" height={32} alt="Logo" />
        </CHeaderBrand>

        <CHeaderNav className="d-none d-md-flex me-auto">
          {(
            <CHeaderBrand to="/">
              {/* TODO */}
                <img src="/VPI_logo.png" height={32} alt="Logo" />
              {/* <CIcon icon={logo} height={32} alt="Logo" /> */}
            </CHeaderBrand>
          )}
        </CHeaderNav>

        <DynamicSubHeader></DynamicSubHeader>

        <CHeaderNav className="ms-3">
          <NotificationDropdown />
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <IssueDropdown />
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <MessageDropdown />
        </CHeaderNav>
        <CHeaderNav className="ms-3">
        </CHeaderNav>
        {/* <CHeaderNav className="ms-5">
        </CHeaderNav> */}

        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>

      {showBreadcrumb ? drawBreadcrumb : ''}
    </CHeader>
  );
};

export default AppHeader;
