import { createContext, useState } from "react";

// Create Context
const AppContext = createContext();
export { AppContext };

// Create Provider Component
export const ContextProvider = ({ children }) => {
  const [userRatingValue, setUserRatingValue] = useState(0);

  return (
    <AppContext.Provider value={{ userRatingValue, setUserRatingValue }}>
      {children}
    </AppContext.Provider>
  );
};
