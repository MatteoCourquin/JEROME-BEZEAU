import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import { ReactNode } from 'react';

// type TypeLanguageContext = {
//   language: string;
//   setLanguage: (language: string) => void;
//   data: Language;
// };

// export const LanguageContext = createContext<TypeLanguageContext>({
//   language: 'en',
//   setLanguage: () => {},
//   data: english,
// });

const queryClient = new QueryClient();

const Layout = ({ children }: { children: ReactNode }) => {
  // const [language, setLanguage] = useState('en');
  // const data = language === 'en' ? english : french;

  // useEffect(() => {
  //   setLanguage(localStorage.getItem('language') || navigator.language.split('-')[0]);
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <LanguageContext.Provider value={{ language, setLanguage, data }}> */}
      <Head>
        <title>Jérôme Bezeau</title>
        <meta name="description" content="Art Director & Digital designer" />
        <meta
          name="keywords"
          content="Art Director, Digital designer, Web designer, Graphic designer, UI/UX designer, Front-end developer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <Cursor /> */}
      {/* <ScrollTop /> */}
      {/* <Burger /> */}
      {children}
      <Footer />
      {/* <Analytics /> */}
      {/* <SpeedInsights /> */}
      {/* </LanguageContext.Provider> */}
    </QueryClientProvider>
  );
};

export default Layout;
