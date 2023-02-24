import { useEffect } from "react";
import { useParams } from "react-router-dom"
import ZTreeSelect from "../../../core/components/zTreeSelect";
import bimClient from "../../../core/connection/bimClient";

const RoleDetails = () => {
  const params = useParams();
  const roleId = params.roleId;

  // useEffect(() => {
  //   bimClient.get('permissions').then(res => {
  //     console.log(res);
  //   })
  // }, [])

  return(
    <ZTreeSelect datasource={'permissions'} valueField={'id'} tilteField={'name'} childrenField={'nodes'}></ZTreeSelect>
  )
}

export default RoleDetails;