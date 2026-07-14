export const FormActions = {
  Add: 'add',
  Edit: 'edit',
} as const;

export type FormActionValues = (typeof FormActions)[keyof typeof FormActions];
