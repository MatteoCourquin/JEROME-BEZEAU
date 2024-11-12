import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { LanguageContext } from '@/layout/default';
import { useParallax } from '@/utils/animations';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';

export default function Page() {
  const { isFrench } = useContext(LanguageContext);
  const descriptionRef = useRef(null);

  const handdleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.info('Form submitted');
  };

  useGSAP(() => {
    useParallax(descriptionRef.current, 0.1, 'bottom', 1024);
  });

  return (
    <section className="relative grid min-h-screen grid-cols-1 gap-x-[20%] px-x-default pb-y-default pt-header lg:grid-cols-[6fr,4fr]">
      <div ref={descriptionRef}>
        <h1 className="pt-y-default">CONTACT</h1>
        <div className="pt-16">
          <p className="text1 text-white-80">Ready to kick things off ?</p>
          <p className="text1 pt-5 text-white-80">
            Feel free to send an e-mail, give me a call or just fill the form !
          </p>
          <div className="flex flex-col gap-y-14 pt-y-half-default md:grid-cols-2 md:gap-x-5 lg:grid-cols-3">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="relative mb-1 h-2 w-2">
                  <div className="absolute h-full w-full bg-green"></div>
                  <div className="absolute h-full w-full animate-ping bg-green"></div>
                </div>
                <h6 className="text2">AVAILABLE FOR WORK</h6>
              </div>
              <p>
                In Paris <br />& remotely
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <h6 className="text2 text-white-40">SEND A MESSAGE :</h6>
              <a className="link link_white-80 w-fit" href="mailto:jeromebezeau.pro@gmail.com">
                jeromebezeau.pro@gmail.com
              </a>
              <h6 className="text2 pt-5 text-white-40">GIVE ME A CALL :</h6>
              <a className="link link_white-80 w-fit" href="tel:+33664583272">
                (+33) 6 64 58 32 72
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text1 pt-y-default text-white-80">FILL THE FORM :</p>
        <form className="flex flex-col gap-10 pt-10" onSubmit={(e) => handdleFormSubmit(e)}>
          <Input name="name" placeholder="Name & surname" type="text" />
          <Input name="email" placeholder="Your Email" type="email" />
          <Input name="phone" placeholder="Your phone number" type="tel" />
          <Input name="subject" placeholder="What are you interested in ?" type="select">
            <option value="default">What are you interested in ?</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="both">Both</option>
          </Input>
          <Input name="message" placeholder="A few words to describe it ?" type="textarea" />
          <Button className="w-fit" type="submit">
            {isFrench ? 'Envoyer' : 'Send'}
          </Button>
        </form>
      </div>
    </section>
  );
}
