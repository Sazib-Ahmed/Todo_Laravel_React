import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  role: null, // Add role to the context
  setUser: () => {},
  setToken: () => {},
  setRole: () => {}, // Add a function to set the role
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [role, _setRole] = useState(""); // Initialize role state with an empty string

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      // Parse the JWT token to extract the role
      const decodedToken = parseJwt(token);
      const userRole = decodedToken.role;
      _setRole(userRole); // Set the role in the state
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      _setRole(""); // Clear the role if the token is removed
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setRole = (newRole) => {
    _setRole(newRole);
  };

  // Helper function to parse JWT token
  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => {
          return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        role, // Include the role in the context
        setRole, // Include the setRole function in the context
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
