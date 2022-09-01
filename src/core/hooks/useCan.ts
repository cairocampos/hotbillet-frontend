type UseCanParams = {
  permissions?: string[],
  roles?: string[]
}

export function useCan({ permissions, roles } : UseCanParams) {
  // const {user, isAuthenticated} = {};

  const isAuthenticated = true;
  const user: UseCanParams = {
    permissions: ['list'],
    roles: []
  }

  if(!isAuthenticated) return false;

  if(permissions?.length) {
    const hasAllPermissions = permissions.every(permission => {
      return user?.permissions?.includes(permission)
    })
    if(!hasAllPermissions) return false;
  }

  if(roles?.length) {
    const hasAllRoles = roles.every(role => {
      return user?.roles?.includes(role)
    })
    if(!hasAllRoles) return false;
  }

  return true;
}