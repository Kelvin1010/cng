import {
  Routes,
  Route,
} from "react-router-dom";


import PointList from "./components/pointList";
import { StyledContainer } from '../../core';

export default function PointsContainer() {
  return (
    <StyledContainer>
      <Routes >
        <Route exact path='' name='Points' element={ <PointList/>} />
      </Routes >
    </StyledContainer>
  );
}