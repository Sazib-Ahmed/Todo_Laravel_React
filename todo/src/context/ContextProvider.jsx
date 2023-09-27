import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext({
  currentUser: null,
  id: null,
  token: null,
  roles: null,
  notification: null,
  setUser: () => {},
  setId: () => {},
  setToken: () => {},
  setRole: () => {},
  setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // Initialize id from localStorage or set it to null if not found
  const [id, _setId] = useState(localStorage.getItem('USER_ID') || null);
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN') || null);
  const [roles, _setRole] = useState(localStorage.getItem('USER_ROLE') || null);
  const [notification, _setNotification] = useState('');

  const setId = (id) => {
    _setId(id);
    if (id) {
      localStorage.setItem('USER_ID', id);
    } else {
      localStorage.removeItem('USER_ID');
    }
  };

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  const setRole = (roles) => {
    _setRole(roles);
    if (roles) {
      localStorage.setItem('USER_ROLE', roles);
    } else {
      localStorage.removeItem('USER_ROLE');
    }
  };

  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('');
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        id,
        setId,
        token,
        setToken,
        roles,
        setRole,
        notification,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
