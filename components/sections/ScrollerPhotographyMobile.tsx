import { useLanguage } from '@/providers/language.provider';
import { Photo } from '@/types';
import AnimatedText from '../atoms/AnimatedText';
import CardPhotographyMobile from './CardPhotographyMobile';

const ScrollerPhotographyMobile = ({ photos }: { photos: Photo[] }) => {
  const { isFrench } = useLanguage();

  const title = isFrench ? 'PHOTOGRAPHIE' : 'PHOTOGRAPHY';
  return (
    <>
      <section className="overflow-hidden pt-header">
        <AnimatedText
          className="w-full pb-y-half-default pt-y-default text-center text-white-80"
          isRandomAnim={true}
          style={{ fontSize: `calc(120vw / ${title.length})` }}
        >
          {isFrench ? 'PHOTOGRAPHIE' : 'PHOTOGRAPHY'}
        </AnimatedText>
      </section>
      <section className="flex flex-col gap-5 overflow-hidden px-x-default pb-y-default">
        {photos.map((photo, index) => (
          <CardPhotographyMobile key={photo.title + index} photo={photo} />
        ))}
      </section>
    </>
  );
};

export default ScrollerPhotographyMobile;
