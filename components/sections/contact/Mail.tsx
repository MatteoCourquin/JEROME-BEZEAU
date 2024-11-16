import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';

const Mail = ({ className }: { className?: string }) => {
  const { isFrench } = useLanguage();
  return (
    <div className={className}>
      <h6 className="text2 pb-[18px] text-white-40">
        {isFrench ? 'ENVOYEZ UN MESSAGE :' : 'SEND A MESSAGE :'}
      </h6>
      <a
        className="link link_white-80 inline-block w-fit"
        href="mailto:jeromebezeau.pro@gmail.com"
        onMouseLeave={(e) => useResetMagnet(e)}
        onMouseMove={(e) => useMagnet(e, 1)}
      >
        jeromebezeau.pro@gmail.com
      </a>
    </div>
  );
};

export default Mail;
