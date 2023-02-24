import { Navigate, Routes, Route } from 'react-router-dom';

import { StyledContainer } from '../../core';
import './Auth.style.scss';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default function AuthContainer() {
  return (
    <StyledContainer style={{ height: '100vh' }}>
      <Routes>
        <Route exact path="/*" element={<Navigate to="login" />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/register" element={<SignUp />} />
      </Routes>
    </StyledContainer>
  );
}
