import { useCurrentUser, usePermissions } from "./ctx.hooks"

export const useIsGranted = (permission) => {
  const currentUser = useCurrentUser();
  const permissions = usePermissions();
  return permissions?.includes(permission) || currentUser.isAdmin;
}