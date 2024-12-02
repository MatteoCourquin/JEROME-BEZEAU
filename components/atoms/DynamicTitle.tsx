import clsx from 'clsx';

const DynamicTitle = ({ children, className }: { children: string; className?: string }) => {
  return (
    <h1
      className={clsx('px w-full whitespace-nowrap text-center', className)}
      style={{ fontSize: `calc(120vw / ${children.length})` }}
    >
      {children}
    </h1>
  );
};

export default DynamicTitle;
