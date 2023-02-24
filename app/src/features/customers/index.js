import {
  Routes,
  Route,
} from "react-router-dom";


import CustomerList from "./components/customerList";
import { StyledContainer } from '../../core';

import { useParams } from "react-router-dom";

export default function CustomersContainer() {
  return (
    <StyledContainer>
      <Routes >
        <Route exact path='' name='Customers' element={ <CustomerList/>} />
        {/* <Route path='/:customerId' name='Customer' element={<MemberDetails />} /> */}
      </Routes >
    </StyledContainer>
  );
}