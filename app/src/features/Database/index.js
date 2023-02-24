import {
  Routes,
  Route,
} from "react-router-dom";

// import "./styles/style.css";

import BackupList from "./components/backupList";
import { StyledContainer } from '../../core';

import { useParams } from "react-router-dom";

export default function DatabaseContainer() {
  return (
    <StyledContainer>
      <Routes >
        <Route exact path='' name='Database' element={<BackupList />} />
      </Routes >
    </StyledContainer>
  );
}