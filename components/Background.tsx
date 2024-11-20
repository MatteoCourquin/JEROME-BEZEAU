import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 hidden h-screen w-screen grid-cols-12 gap-x-5 px-x-default md:grid">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="relative h-full border-x border-dashed border-[#808080] opacity-15"
        ></div>
      ))}
    </div>
  );
};

export default Background;
