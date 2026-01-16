import { createContext, ReactNode, useContext, useState, useCallback } from 'react';

export enum CURSOR_STATE {
  DEFAULT = 'DEFAULT',
  POINTER = 'POINTER',
  JOYSTICK = 'JOYSTICK',
}

interface CursorContextType {
  cursorState: CURSOR_STATE;
  isActive: boolean;
  setCursorState: (state: CURSOR_STATE) => void;
  setIsActive: (active: boolean) => void;
  changeToDefault: () => void;
  changeToPointer: () => void;
  changeToJoystick: () => void;
}

const CursorContext = createContext<CursorContextType | null>(null);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorState, setCursorState] = useState<CURSOR_STATE>(CURSOR_STATE.DEFAULT);
  const [isActive, setIsActive] = useState(false);

  const changeToDefault = useCallback(() => setCursorState(CURSOR_STATE.DEFAULT), []);
  const changeToPointer = useCallback(() => setCursorState(CURSOR_STATE.POINTER), []);
  const changeToJoystick = useCallback(() => setCursorState(CURSOR_STATE.JOYSTICK), []);

  const value: CursorContextType = {
    cursorState,
    isActive,
    setCursorState,
    setIsActive,
    changeToDefault,
    changeToPointer,
    changeToJoystick,
  };

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
};

export const useCursor = () => {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    // Return a no-op implementation if provider is not available
    return {
      cursorState: CURSOR_STATE.DEFAULT,
      isActive: false,
      setCursorState: () => {},
      setIsActive: () => {},
      changeToDefault: () => {},
      changeToPointer: () => {},
      changeToJoystick: () => {},
    };
  }
  return ctx;
};
