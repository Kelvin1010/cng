import { Navigate, Routes, Route } from 'react-router-dom';
import { StyledContainer } from '../../core';

export default function AdminPageContainer() {
  return (
    <StyledContainer style={{ height: '100vh' }}>
      <Routes>
        {/* <Route exact path="/*" element={<Navigate to="login" />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/register" element={<SignUp />} /> */}
      </Routes>
    </StyledContainer>
  );
}
