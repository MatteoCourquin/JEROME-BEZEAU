import { LanguageContext } from '@/layout/default';
import { useContext } from 'react';

export default function About() {
  const { isFrench } = useContext(LanguageContext);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center">
      <h1>{isFrench ? 'À PROPOS' : 'ABOUT'}</h1>
    </section>
  );
}
