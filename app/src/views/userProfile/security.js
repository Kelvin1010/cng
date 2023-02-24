import React, { useCallback, useEffect, useState } from "react";

import { CCol, CRow } from "@coreui/react";

import ProfileForm from "./profileForm";
import { useCurrentUser } from "../../core/hooks/ctx.hooks";
import bimClient from "../../core/connection/bimClient";
import SecurityForm from "./changePasswordForm";


const UserSecurity = () => {
  const me = useCurrentUser();
  const [user, setUser] = useState();

  const [rerender, setRerender] = useState(null);
  const forceUpdate = useCallback(() => {
    console.log('forceUpdate');
    setRerender(Math.random())
  }, []);

  useEffect(() => {
    if (me) {
      bimClient.get(`users/profile/${me.username}`).then(json => {
        if (json.status === 200) {
          const data = json.data;
          console.log(data);
          setUser(data);
        }
      });
    }
  }, [])

  if (!user)
    return (<></>)
  else
    return (
      <>
        <div style={{ height: 80, padding: 100, paddingTop: 50 }}>
          <h4>Change password</h4>
        </div>

        <div style={{ width: '100%', padding: '5px' }}>
          <CRow>
            <CCol xs={12} md={12} xl={12}>
              <SecurityForm rerender={rerender} user={user}></SecurityForm>
            </CCol>
          </CRow>

        </div>
      </>
    );
};

export default UserSecurity;
