export const isLoggedIn = () => {
  return !!localStorage.getItem("customerId");
};

export const getCustomerId = () => {
  return localStorage.getItem("customerId");
};

export const logout = () => {
  localStorage.removeItem("customerId");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
};