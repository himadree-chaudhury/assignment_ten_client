import { createContext, useState } from "react";

// Create Context for managing the movie rating input
const AppContext = createContext();
export { AppContext };

export const ContextProvider = ({ children }) => {
  const [userRatingValue, setUserRatingValue] = useState(0);

  return (
    <AppContext.Provider value={{ userRatingValue, setUserRatingValue }}>
      {children}
    </AppContext.Provider>
  );
};
