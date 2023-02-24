import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../routes";

export default function DynamicSubHeader() {
  return (
    <Routes>
      {routes.map((route, idx) => {
        return (
          route.element && (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              element={route.subheader ? <route.subheader /> : <></>}
            />
          )
        );
      })}
    </Routes>
  );
}
