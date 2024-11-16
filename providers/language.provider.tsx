import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext({
  isFrench: false,
  setIsFrench: (_: boolean) => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [isFrench, _setIsFrench] = useState(false);

  const setIsFrench = (isFrench: boolean) => {
    localStorage.setItem('isFrench', isFrench.toString());
    _setIsFrench(isFrench);
  };

  useEffect(() => {
    setIsFrench(localStorage.getItem('isFrench') === 'true' || navigator.language.includes('fr'));
  }, []);

  return (
    <LanguageContext.Provider value={{ isFrench, setIsFrench }}>
      {children}
    </LanguageContext.Provider>
  );
};
