import { z } from 'zod';

const AddGoalForm = (t: (key: string) => string) => {
  return z.object({
    title: z.string().min(1, t('validation.title.required')),
    date: z.date({
      required_error: t('validation.date.required'),
    }),
    description: z.string().min(1, t('validation.description.required')),
    image: z.string().optional(),
  });
};

export type FormDataAddGoalForm = {
  title: string;
  date: Date;
  description: string;
  image: string | undefined;
};

export default AddGoalForm;
