import Contact from '@/components/sections/Contact';
import { LanguageContext } from '@/layout/default';
import { useParallax } from '@/utils/animations';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useContext, useRef } from 'react';

export default function Page() {
  const descriptionRef = useRef<HTMLDivElement>(null);

  const { isFrench } = useContext(LanguageContext);

  useGSAP(() => {
    useParallax(descriptionRef.current, 0.2, 'bottom');
  }, []);

  return (
    <>
      <section className="relative grid min-h-screen grid-cols-1 gap-x-[10%] px-x-default pb-y-default pt-header lg:grid-cols-[5fr,6fr]">
        <div ref={descriptionRef} className="flex flex-col gap-14 pt-y-default">
          <h1>{isFrench ? 'À PROPOS DE MOI' : 'ABOUT ME'}</h1>
          <div className="w-3/5">
            <h5 className="text2 uppercase !text-white-80">PROFESSIONALLY</h5>
            <p className="text2 pt-6">
              Est et id suspendisse nullam consequat nisl augue. At posuere ac nec ac. Proin est
              augue massa ultrices massa id facilisis. Quam facilisis tellus ut ipsum. Dui vulputate
              netus mauris lorem volutpat. Lobortis laoreet metus ultrices cum eu ut lectus risus
              orci. Felis turpis ut tortor neque a.
            </p>
          </div>
          <div className="w-3/5">
            <h5 className="text2 uppercase !text-white-80">PERSONNALY</h5>
            <p className="text2 pt-6">
              Est et id suspendisse nullam consequat nisl augue. At posuere ac nec ac. Proin est
              augue massa ultrices massa id facilisis. Quam facilisis tellus ut ipsum. Dui vulputate
              netus mauris lorem volutpat. Lobortis laoreet metus ultrices cum eu ut lectus risus
              orci. Felis turpis ut tortor neque a.
            </p>
          </div>
        </div>
        <div className="h-full w-full pt-y-default">
          <Image
            alt="About me"
            className="h-full w-full object-cover"
            height={1080}
            src="/images/JB.jpeg"
            width={1920}
          />
        </div>
      </section>
      <Contact />
    </>
  );
}
