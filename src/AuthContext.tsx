// Step 2: Import React and createContext
import React, { createContext, useState, ReactNode } from 'react';

// Step 3: Define the context shape
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

// Step 4: Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false, // Default value for isAuthenticated
  setIsAuthenticated: () => {}, // Placeholder function, will be replaced by the actual function from useState in the provider
});

// Step 5: Create the Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Step 6: Export the context and the provider
export default AuthContext;