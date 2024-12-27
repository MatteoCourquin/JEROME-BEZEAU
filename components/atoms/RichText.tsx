import clsx from 'clsx';
import { PortableText } from 'next-sanity';
import { forwardRef } from 'react';
import { TypedObject } from 'sanity';

interface RichTextProps {
  value: TypedObject[];
  className?: string;
}

const RichText = forwardRef<HTMLDivElement, RichTextProps>(({ value, className }, ref) => {
  return (
    <div ref={ref} className={clsx(className, 'space-y-6')}>
      <PortableText
        value={value}
        components={{
          block: {
            h5: ({ children }) => <h4 className="heading4">{children}</h4>,
            normal: ({ children }) => <p>{children}</p>,
          },
          marks: {
            link: ({ value, children }) => (
              <a
                className="link link_white-80 cursor-button"
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
});

export default RichText;
