import { useLanguage } from '@/providers/language.provider';
import Button from '../atoms/Button';
import ScrollingTitle from '../ScrollingTitle';
import Call from './contact/Call';
import Location from './contact/Location';
import Mail from './contact/Mail';

const Contact = () => {
  const { isFrench } = useLanguage();

  return (
    <section className="flex flex-col gap-y-default overflow-hidden px-x-default py-y-default">
      <ScrollingTitle
        scrollSpeed={15}
        text={isFrench ? 'Prêt à commencer ?' : 'Ready to kick things off?'}
      />
      <div className="grid grid-cols-1 gap-y-y-default md:grid-cols-2 md:gap-x-5 lg:grid-cols-3">
        <Location />
        <Mail className="block lg:hidden" />
        <Call className="block lg:hidden" />
        <div className="hidden flex-col gap-y-11 lg:flex">
          <Mail />
          <Call />
        </div>
        <div className="flex flex-col gap-[18px]">
          <h3 className="text2 text-white-40">
            {isFrench ? 'OU REMPLISSEZ LE FORMULAIRE' : 'OR FILL THE FORM'}
          </h3>
          <Button className="w-fit" href="/contact" type="a">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
