import { useTouchDevice } from '@/hooks/useTouchDevice';
import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  if (useTouchDevice()) {
    return <>{children}</>;
  }
  return (
    <ReactLenis options={{ lerp: 0.1, duration: 1.5 }} root>
      {children}
    </ReactLenis>
  );
};
