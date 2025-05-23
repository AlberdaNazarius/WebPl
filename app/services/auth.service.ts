let authenticated = false

const isAuthenticated = () => {
  return authenticated;
}

const login = () => {
  authenticated = true
}

const logout = () => {
  authenticated = false
}

export const AuthService = {
  isAuthenticated,
  login,
  logout,
}