import AppContext from './AppContext.jsx';

function AppContextProvider({ children }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    backendUrl
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
