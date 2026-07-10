import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import type { TextInput } from 'react-native';

type Submission = { name: string; amount: number };

export function useFormScreenLogic() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [submission, setSubmission] = useState<Submission | null>(null);
  const amountRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const parsedAmount = Number(amount);

    if (!trimmedName && !amount.trim()) {
      Alert.alert('Missing fields', 'Please fill in both Name and Amount.');
      return;
    }

    if (!trimmedName) {
      Alert.alert('Missing field', 'Please enter a Name.');
      return;
    }

    if (!amount.trim() || isNaN(parsedAmount)) {
      Alert.alert('Missing field', 'Please enter a valid Amount.');
      return;
    }

    setSubmission({ name: trimmedName, amount: parsedAmount });
    setName('');
    setAmount('');
  };

  const closeModal = () => setSubmission(null);

  const focusAmount = () => {
    amountRef.current?.focus();
  };

  return { name, setName, amount, setAmount, amountRef, focusAmount, handleSubmit, submission, closeModal };
}
