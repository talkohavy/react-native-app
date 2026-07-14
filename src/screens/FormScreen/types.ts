import type { RouteProp } from '@react-navigation/native';
import type { FormActionValues } from './logic/constants';

export type FormRouteProp = RouteProp<
  {
    Form: {
      action: FormActionValues;
      name: string;
      amount: string;
    };
  },
  'Form'
>;

export type HandleSubmitProps = {
  name: string;
  amount: string;
};
