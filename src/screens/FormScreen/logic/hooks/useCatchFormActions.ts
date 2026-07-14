import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { FormActions } from '../constants';
import type { FormRouteProp, HandleSubmitProps } from '../../types';

type UseCatchFormActionsProps = {
  handleSubmit: (params: HandleSubmitProps) => void;
};

export function useCatchFormActions(props: UseCatchFormActionsProps) {
  const { handleSubmit } = props;

  const route = useRoute<FormRouteProp>();

  useEffect(() => {
    async function sumbitFormAsync() {
      const name = route.params.name ?? '';
      const amount = route.params.amount ?? '';

      await new Promise((resolve) => setTimeout(resolve, 1000));

      handleSubmit({ name, amount });
    }

    const { action } = route.params;

    if (action === FormActions.Add) {
      sumbitFormAsync();
    }
  }, [route.params]);

  return {};
}
