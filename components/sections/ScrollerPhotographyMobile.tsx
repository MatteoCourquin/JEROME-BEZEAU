import { Photo } from '@/types';
import CardPhotographyMobile from './CardPhotographyMobile';
import { useLanguage } from '@/providers/language.provider';
import DynamicTitle from '../atoms/DynamicTitle';

const ScrollerPhotographyMobile = ({ photos }: { photos: Photo[] }) => {
  const { isFrench } = useLanguage();

  return (
    <>
      <section className="overflow-hidden pt-header">
        <DynamicTitle className="py-y-default" coefficient={1.2}>
          {isFrench ? 'PHOTOGRAPHIE' : 'PHOTOGRAPHY'}
        </DynamicTitle>
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
