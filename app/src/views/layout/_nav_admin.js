import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilUser,
  cilSpeech,
  cilGroup,
  cilBuilding,
  cibRedis,
  cilTags,
  cilNewspaper,
  cilBraille,
  cilLan,
  cilCheckCircle,
  cilLibraryBuilding,
} from '@coreui/icons';
import { CNavItem } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Users',
    to: 'users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Roles',
    to: 'roles',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Database',
    to: 'database',
    icon: <CIcon icon={cibRedis} customClassName="nav-icon" />,
  },
];

export default _nav;
