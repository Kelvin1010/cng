import React from 'react'
import { useLocation } from 'react-router-dom'

import routes_app from '../routes'
import routes_admin from '../routes_admin'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { useTranslation } from 'react-i18next'

const AppBreadcrumb = ({forAdmin}) => {
  const {t, i18n} = useTranslation();
  const currentLocation = useLocation().pathname
  const routes = forAdmin? routes_admin: routes_app;

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => pathname.endsWith(route.path.replace(/\/\*+$/, '')))
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href={forAdmin ? '#/admin' : "/"}>{forAdmin? t('Admin'): t('Home')}</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active
              ? { active: true }
              : { href: `#${breadcrumb.pathname}` })}
            key={index}
          >
            {t(breadcrumb.name)}
          </CBreadcrumbItem>
        );
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
