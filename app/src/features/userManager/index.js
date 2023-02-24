import {
  Routes,
  Route,
} from "react-router-dom";

// import "./styles/style.css";

import UserList from "./components/userList";
// import MemberDetails from "./components/memberDetails";
import { StyledContainer } from '../../core';

import { useParams } from "react-router-dom";

export default function UsersContainer() {
  const { projectId } = useParams();
  return (
    <StyledContainer>
      <Routes >
        <Route exact path='' name='Users' element={<UserList />} />
        {/* <Route path='/:userId' name='User' element={<MemberDetails />} /> */}
      </Routes >
    </StyledContainer>
  );
}