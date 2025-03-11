import { createContext, useState } from "react";

// Create Context
// !Do Not Uncomment The Below Line
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

// Create Provider Component
export const ContextProvider = ({ children }) => {
  const [userRatingValue, setUserRatingValue] = useState(0);

  return (
    <AppContext.Provider value={{ userRatingValue,setUserRatingValue }}>
      {children}
    </AppContext.Provider>
  );
};
