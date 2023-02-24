import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSidebarVisible, setSidebarUnfoldable } from "./store";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cibGitpod } from "@coreui/icons";

import { AppSidebarNav } from "./AppSidebarNav";

// import { logoNegative } from '../../assets/brand/logo-negative'
// import { sygnet } from '../../assets/brand/sygnet'

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "./_nav";
import admin_navigation from "./_nav_admin";

const AppSidebar = ({forAdminPage = false}) => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.layout.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.layout.sidebarShow);
  const canToggleSidebar = useSelector((state) => state.layout.canToggleSidebar);

  let band;
  if (unfoldable) {
    band = <></>;
  } else {
    band = (
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <div
          style={{
            padding: 11.5,
            verticalAlign: "center",
            display: 'flex',

          }}
        >
          <CIcon
            className="sidebar-brand-full"
            icon={cibGitpod}
            height={35}
            style={{ marginRight: 12.5 }}
          />
          {/* <img src="/logo-cic-bigger.jpg" height={32} alt="Logo" /> */}
          <h4 style={{ color: 'white' }}>VPI FractPred</h4>
          {/* <img src="/logo.png" height={32} alt="Logo" /> */}
        </div>
      </CSidebarBrand>
    );
  }
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        // dispatch(setSidebarVisible(visible));
      }}
    >
      {band}
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={forAdminPage === true? admin_navigation: navigation} />
        </SimpleBar>
      </CSidebarNav>
      {canToggleSidebar && <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(setSidebarUnfoldable(!unfoldable))}
      />}
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
// export default AppSidebar;
