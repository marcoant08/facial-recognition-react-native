import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const changeUser = async (user) => {
    console.log("NEW USER:\n", user);

    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed: !!user,
        user,
        changeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
