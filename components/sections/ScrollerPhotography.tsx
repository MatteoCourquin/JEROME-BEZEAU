import { Photo } from '@/types';
import CardPhotographyMobile from './CardPhotographyMobile';
import { useLanguage } from '@/providers/language.provider';
import DynamicTitle from '../atoms/DynamicTitle';

const ScrollerPhotography = ({ photos }: { photos: Photo[] }) => {
  const { isFrench } = useLanguage();

  return (
    <>
      <section className="pt-header">
        <DynamicTitle className="py-y-default">
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

export default ScrollerPhotography;
