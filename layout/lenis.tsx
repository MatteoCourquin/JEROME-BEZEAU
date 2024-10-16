import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis options={{ lerp: 0.1, duration: 1.5 }} root>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
