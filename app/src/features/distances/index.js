import {
  Routes,
  Route,
} from "react-router-dom";


import DistanceList from "./components/distanceList";
import { StyledContainer } from '../../core';

import { useParams } from "react-router-dom";

export default function DistancesContainer() {
  return (
    <StyledContainer>
      <Routes >
        <Route exact path='' name='Distances' element={ <DistanceList/>} />
      </Routes >
    </StyledContainer>
  );
}