import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppContent, AppSidebar, AppFooter, AppHeader } from ".";
import { useCurrentUser } from "../../core/hooks/ctx.hooks";

const AdminLayout = () => {
  const currentUser = useCurrentUser();
  return (
    currentUser.isAdmin === true && <div>
      <AppSidebar forAdminPage={true} />
      <div className="wrapper d-flex flex-column min-vh-100">  
      {/* bg-light */}
        <AppHeader forAdmin />
        <div className="body flex-grow-1 px-0">
          <AppContent forAdmin />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
