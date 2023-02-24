import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import openNotification from "../components/toastMessage/toastMessage";
import bimClient from "../connection/bimClient";

export const useCurrentUser = () => {
  const currentUser = JSON.parse(localStorage.getItem('usk'));
  return currentUser;
};

export const usePermissions = () => {
  const permissions = JSON.parse(localStorage.getItem('per'));
  return permissions;
}

export const useToken = () => {
  const currentUser = useCurrentUser();
  const token = 'JWT ' + currentUser?.token;
  return token;
}

