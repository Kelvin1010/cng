import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppContent, AppSidebar, AppHeader } from ".";
import { storeUserPermissions } from "../Auth/services/auth.service";

const DefaultLayout = (props) => {
  const dispatch = useDispatch();

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">  
      {/* bg-light */}
        <AppHeader />
        <div className="body flex-grow-1 px-0">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  );
};

// export default withTranslation('translations')(DefaultLayout);
export default DefaultLayout;
