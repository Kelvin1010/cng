import {
  Routes,
  Route,
} from "react-router-dom";

// import "./styles/style.css";

import RoleList from "./components/roleList";
import RoleDetails from "./components/roleDetails";
import { StyledContainer } from '../../core';

import { useParams } from "react-router-dom";

export default function RolesContainer() {
  return (
    <StyledContainer>
      <Routes >
        <Route exact path='' name='Roles' element={<RoleList />} />
        <Route path='/:roleId' name='Role' element={<RoleDetails />} />
      </Routes >
    </StyledContainer>
  );
}