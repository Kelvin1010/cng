import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilSpeedometer,
  cilSpeech,
  cilGroup,
  cilLibrary,
  cil3d,
  cilLayers
} from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";
import { useSelector } from "react-redux";

const _nav = [
  {
    component: CNavItem,
    name: "Customers",
    to: "customers",
    // permission: "System.Customers",
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  }, {
    component: CNavItem,
    name: "Points",
    to: "points",
    // permission: "System.Points",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Distances",
    to: "distances",
    // permission: "System.Points",
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Drivers",
    to: "drivers",
    // permission: "System.Points",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  }, {
    component: CNavItem,
    name: "Requests",
    to: "requests",
    // permission: "System.Points",
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  }, {
    component: CNavItem,
    name: "Vehicles",
    to: "vehicles",
    // permission: "System.Points",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  }, {
    component: CNavItem,
    name: "Vendors",
    to: "vendors",
    // permission: "System.Points",
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
];

export default _nav;
