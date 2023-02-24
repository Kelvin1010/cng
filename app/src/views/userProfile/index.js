import { StyledContainer } from "../../core";
import { AppHeader } from "../layout";

import bimClient from "../../core/connection/bimClient";
import { useCurrentUser } from "../../core/hooks/ctx.hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import UserProfile from "./userProfile";
import ProtectedRoute from "../../modules/guards";
import UserSecurity from "./security";

export default function AccountContainer() {
  const currentUser = useCurrentUser();

  return (
    <>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader canToggleSideBar={"false"} showBreadcrumb={"false"} />
        
        <StyledContainer
          style={{
            // alignItems: "center",
            // justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            height: 'calc(100vh - 75px)'
          }}
        >
          <Routes>
            <Route
              key={'profile'}
              path={'/profile'}
              exact={true}
              name={'Profile'}
              element={
                <ProtectedRoute>
                  <UserProfile></UserProfile>
                </ProtectedRoute>
              }
            />

            <Route
              key={'security'}
              path={'/security'}
              exact={true}
              name={'Security'}
              element={
                <ProtectedRoute>
                  <UserSecurity></UserSecurity>
                </ProtectedRoute>
              }
            />

            {<Route path="/" element={<Navigate to="profile" replace />} />}
          </Routes>
        </StyledContainer>
      </div>

    </>
  );
}
