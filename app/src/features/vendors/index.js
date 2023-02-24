import {
  Routes,
  Route,
} from "react-router-dom";


import VendorList from "./components/vendorList";
import { StyledContainer } from '../../core';

export default function VendorsContainer() {
  return (
    <StyledContainer>
      <Routes >
        <Route exact path='' name='Customers' element={ <VendorList/>} />
        {/* <Route path='/:customerId' name='Customer' element={<MemberDetails />} /> */}
      </Routes >
    </StyledContainer>
  );
}