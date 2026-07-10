import { useCallback, useState } from 'react';

export const menuOptions = ['Share', 'Duplicate', 'Archive', 'Report'];

export function useSlideModalDemoLogic() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string>();

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  const selectOption = useCallback((option: string) => {
    setSelected(option);
    setVisible(false);
  }, []);

  return {
    visible,
    open,
    close,
    selectOption,
    selected,
  };
}
