import {
  Routes,
  Route,
} from "react-router-dom";


import VehicleList from "./components/vehicleList";
import { StyledContainer } from '../../core';

export default function VehiclesContainer() {
  return (
    <StyledContainer>
      <Routes >
        <Route exact path='' name='Customers' element={ <VehicleList/>} />
        {/* <Route path='/:customerId' name='Customer' element={<MemberDetails />} /> */}
      </Routes >
    </StyledContainer>
  );
}