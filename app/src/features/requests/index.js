import {
  Routes,
  Route,
} from "react-router-dom";


import RequestList from "./components/requestList";
import { StyledContainer } from '../../core';

import { useParams } from "react-router-dom";

export default function RequestsContainer() {
  return (
    <StyledContainer>
      <Routes >
        <Route exact path='' name='Drivers' element={ <RequestList/>} />
      </Routes >
    </StyledContainer>
  );
}