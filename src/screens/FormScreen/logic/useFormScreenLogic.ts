import { useRef, useState } from 'react';
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
    if (!trimmedName || !amount || isNaN(parsedAmount)) return;
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
