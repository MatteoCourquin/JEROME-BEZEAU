import { PortableText } from 'next-sanity';
import { TypedObject } from 'sanity';

const RichText = ({ value, className }: { value: TypedObject[]; className?: string }) => {
  return (
    <div className={className}>
      <PortableText
        value={value}
        components={{
          block: {
            h5: ({ children }) => <h5 className="heading5 pb-6">{children}</h5>,
            normal: ({ children }) => <p className="mb-6">{children}</p>,
          },
          marks: {
            strong: ({ children }) => (
              <strong className="text-primary font-semibold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            link: ({ value, children }) => (
              <a
                className="link link_white-80"
                href={value.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {children}
              </a>
            ),
          },
          list: {
            bullet: ({ children }) => <ul className="mb-6 ml-4 list-disc">{children}</ul>,
          },
          listItem: {
            bullet: ({ children }) => <li className="text-white-40">{children}</li>,
          },
        }}
      />
    </div>
  );
};

export default RichText;
