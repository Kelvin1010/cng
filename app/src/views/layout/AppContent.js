import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import appRoutes from '../routes'
import adminRouters from '../routes_admin';
import ProtectedRoute from '../../modules/guards';
import { usePermissions } from '../../core/hooks/ctx.hooks';

import { Trans } from 'react-i18next';

const AppContent = ({forAdmin = false}) => {
  const routes = forAdmin === true? adminRouters: appRoutes;
  const permissions = usePermissions();
  return (
    <CContainer lg>
      {/* <p><Trans>Hello</Trans></p> */}
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && 
              (!route.permission || permissions?.includes(route.permission)) && 
              (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    <ProtectedRoute>
                    <route.element />
                    </ProtectedRoute>
                  }
                />
              )
            )
          })}
          {!forAdmin && <Route path="/" element={<Navigate to="customers" replace />} />}
          {forAdmin && <Route path="/" element={<Navigate to="users" replace />} />}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
