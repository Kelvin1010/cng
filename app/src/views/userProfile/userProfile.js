import React, { useCallback, useEffect, useState } from "react";

import { CCol, CRow } from "@coreui/react";

import ProfileForm from "./profileForm";
import { useCurrentUser } from "../../core/hooks/ctx.hooks";
import bimClient from "../../core/connection/bimClient";


const UserProfile = () => {
  const me = useCurrentUser();
  const [user, setUser] = useState();

  const[rerender, setRerender] = useState(null);
  const forceUpdate = useCallback(() => {
    console.log('forceUpdate');
    setRerender(Math.random())
  }, []);

  useEffect(() => {
    if(me){
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
          <h4>Profile</h4>
        </div>

        <div style={{ width: '100%', padding: '5px' }}>
          <CRow>
            <CCol xs={12} md={12} xl={12}>
              <ProfileForm rerender={rerender} user={user}></ProfileForm>
            </CCol>
          </CRow>

        </div>
      </>
    );
};

export default UserProfile;
