import React, { Suspense } from 'react';
import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';

import '../styles/style.scss';
// import "@coreui/coreui/dist/css/coreui.min.css";
import ProtectedRoute from '../modules/guards';
import AdminLayout from './layout/AdminLayout';
import AccountContainer from './userProfile';
import { useCurrentUser } from '../core/hooks/ctx.hooks';


const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const AuthContainer = React.lazy(() => import('./Auth'));
const AdminPageContainer = React.lazy(() => import('./admin'));
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App(props) {

  const currentUser = useCurrentUser();
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}

          <Route path="/*" name="Home" element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          } />
          <Route exact path="/auth/*" element={<AuthContainer />} />
          <Route exact path="/admin/*" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminPageContainer />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route
            path="/account/*"
            name="Account"
            element={
              <ProtectedRoute>
                <AccountContainer></AccountContainer>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

// extended main view with translate hoc
// export default withTranslation('translations')(App);
export default App;
