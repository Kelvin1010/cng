import {
  Routes,
  Route,
} from "react-router-dom";


import DriverList from "./components/driverList";
import { StyledContainer } from '../../core';

import { useParams } from "react-router-dom";

export default function DriversContainer() {
  return (
    <StyledContainer>
      <Routes >
        <Route exact path='' name='Drivers' element={ <DriverList/>} />
      </Routes >
    </StyledContainer>
  );
}