import React, { createContext, useState, useEffect } from 'react';

import authService from '../services/authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      authService.getMe(storedUser.token)
        .then(res => {
          setUser(res.data.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('user');
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    const userRes = await authService.getMe(res.token);
    setUser(userRes.data.data);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await authService.register(name, email, password);
    const userRes = await authService.getMe(res.token);
    setUser(userRes.data.data);
    return res;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
