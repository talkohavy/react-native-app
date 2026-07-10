import { useCallback, useState } from 'react';

export function useConfirmModalDemoLogic() {
  const [visible, setVisible] = useState(false);
  const [lastAction, setLastAction] = useState<string>();

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  const confirmDelete = useCallback(() => {
    setLastAction('Item deleted ✅');
    setVisible(false);
  }, []);

  const cancel = useCallback(() => {
    setLastAction('Cancelled');
    setVisible(false);
  }, []);

  return {
    visible,
    open,
    close,
    confirmDelete,
    cancel,
    lastAction,
  };
}
