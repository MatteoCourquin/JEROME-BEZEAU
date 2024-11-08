import Contact from '@/components/sections/Contact';
import { LanguageContext } from '@/layout/default';
import { useContext } from 'react';

export default function Page() {
  const { isFrench } = useContext(LanguageContext);

  return (
    <>
      <section className="relative flex flex-col px-x-default pt-header">
        <h1>{isFrench ? 'À PROPOS' : 'ABOUT'}</h1>
      </section>
      <Contact />
    </>
  );
}
